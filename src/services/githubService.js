export const getRepos = async (username) => {
    const response = await fetch(`http://localhost:8080/${username}`)
    return await response.json()
} 

export const getCommits = async (username, repo) => {
    const response = await fetch(`http://localhost:8080/${username}/${repo}`)
    return await response.json()
} 
