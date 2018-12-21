import { fetchRepos, fetchCommits } from './index'

describe('Github Service Failures', () => {

    beforeEach(() => {
        const mockBody = { 
            errors: [
                {
                    message: 'something went wrong with the request'
                }
            ]
        }

        const mockResponse = {
            json: jest.fn(() => {
                return Promise.resolve(mockBody)
            })
        }

        window.fetch = jest.fn().mockImplementation(() => mockResponse);
    })

    it('should throw error when fetching repos with error response', async () => {
        await expect(fetchRepos('username')).rejects
            .toThrow(new Error('something went wrong with the request'))
    })

    it('should throw error when fetching commits with error response', async () => {
        await expect(fetchCommits('username', 'repo')).rejects
            .toThrow(new Error('something went wrong with the request'))    
    })

})

describe('Github Service Successes', () => {

    it('should succeed in fetching repos', async () => {

        const mockBody = { 
            data: {
                user: {
                    repositories: {
                        pageInfo: {
                            hasNextPage: false, 
                            endCursor: null
                        },
                        nodes: [
                            {
                                id: 1,
                                name: 'test name',
                                description: 'test desc',
                                url: 'https://github.com',
                                primaryLanguage: {
                                    name: 'javascript'
                                }
                            }
                        ]
                    }
                }
            }
        }

        const mockResponse = {
            json: jest.fn(() => {
                return Promise.resolve(mockBody)
            })
        }

        window.fetch = jest.fn().mockImplementation(() => mockResponse);

        const result = await fetchRepos('username')

        expect(result).toEqual({
            pageInfo: {
                hasNextPage: false, 
                endCursor: null
            },
            repos: [
                {
                    id: 1,
                    name: 'test name',
                    desc: 'test desc',
                    link: 'https://github.com',
                    lang: 'javascript'
                }
            ]            
        })
    })

    it('should succeed in fetching commits', async () => {
        const mockBody = { 
            data: {
                repository: {
                    ref: {
                        target: {
                            history: {
                                pageInfo: {
                                    hasNextPage: false, 
                                    endCursor: null
                                },
                                edges: [
                                    {
                                        oid: 1,
                                        messageHeadline: 'headline',
                                        message: 'message',
                                        committedDate: '2016-01-24T12:59:34Z'
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }

        const mockResponse = {
            json: jest.fn(() => {
                return Promise.resolve(mockBody)
            })
        }

        window.fetch = jest.fn().mockImplementation(() => mockResponse);

        const result = await fetchCommits('username', 'repo')

        expect(result).toEqual({
            pageInfo: {
                hasNextPage: false, 
                endCursor: null
            },
            commits: [
                {
                    id: 1,
                    headline: 'headline',
                    message: 'message',
                    date: 'Jan 24, 2016'
                }
            ]            
        })

    })

})
