export const fetchRepos = async (username) => {
    const response = await fetch(`http://localhost:8080/repos`)
    return await response.json()
} 

export const fetchCommits = async (username, repo) => {
    const response = await fetch(`http://localhost:8080/${username}/${repo}`)
    return await response.json()
} 
