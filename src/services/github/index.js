import { formatDate } from '../../utils/date'

const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
const baseUrl = 'https://api.github.com/graphql'
const headers = {
    'Authorization': `Bearer ${token}`
}

export const fetchRepos = async (username, endCursor = null) => {
    const query = `query getRepos($username: String!, $endCursor: String) {
        user(login: $username) {
          repositories(first: 20, orderBy: {field: PUSHED_AT, direction: DESC}, after: $endCursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              name
              description
              url
              primaryLanguage {
                name
              }
            }
          }
        }
      }`
    
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            operationName: 'getRepos',
            variables: { username, endCursor }
        }),
        headers: headers
    })
    
    const result = await response.json()
    
    const {valid, message} = validate(result)
    
    if(!valid) throw new Error(message)
    
    return {
        pageInfo: result.data.user.repositories.pageInfo,
        repos: result.data.user.repositories.nodes.map(repo => ({
            id: repo.id,
            name: repo.name,
            desc: repo.description > 80
                ? repo.description.substring(0, 80) + '...' 
                : repo.description,
            link: repo.url,
            lang: repo.primaryLanguage ? repo.primaryLanguage.name : ''
        }))
    }
} 

export const fetchCommits = async (username, repo, endCursor = null) => {
    const query = `query getCommits($username: String!, $repo: String!, $endCursor: String) {
        repository(name: $repo, owner: $username) {
          ref(qualifiedName: "master") {
            target {
              ... on Commit {
                history(first: 20, after: $endCursor) {
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  edges {
                    node {
                      messageHeadline
                      oid
                      message
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }`

    const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            operationName: 'getCommits',
            variables: { username, repo, endCursor }
        }),
        headers: headers
    })
    
    const result = await response.json()

    const {valid, message} = validate(result)

    if(!valid) throw new Error(message)

    return {
        repo: repo,
        pageInfo: result.data.repository.ref.target.history.pageInfo,
        commits: result.data.repository.ref.target.history.edges.map(o => ({
            id: o.node.oid,
            headline: o.node.messageHeadline,
            message: o.node.message,
            date: formatDate(o.node.committedDate)
        }))
    }
} 


const validate = (result) => {    
    if(result.hasOwnProperty('errors') && result.errors.length > 0) {
        //get the first message only
        return { valid: false, message: result.errors[0].message }
    }
    return { valid: true }
}
