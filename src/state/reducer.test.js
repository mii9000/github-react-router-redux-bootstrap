import reducer from './reducer'
import * as actions from './actions'

const initialState = {
    username: '',
    selectedRepo: {},
    showLoading: false,
    error: '',
    commitContainer: { repo: '', pageInfo: { hasNextPage: false, endCursor: null }, commits: [] },
    repoContainer: { pageInfo: { hasNextPage: false, endCursor: null }, repos: [] }
}

describe('Reducers', () => {

    it('should update state with new username', () => {
        const newState = reducer(initialState, {
            type: actions.SELECT_USER,
            payload: 'new username'
        })
        expect(newState === initialState).toBe(false)
        expect(newState).toEqual({
            ...initialState,
            username: 'new username'
        })
    })

    it('should update state with new loading state', () => {
        const newState = reducer(initialState, {
            type: actions.SHOW_LOADING,
            payload: true
        })
        expect(newState === initialState).toBe(false)
        expect(newState).toEqual({
            ...initialState,
            showLoading: true
        })
    })

    it('should reset state', () => {
        const newState = reducer(initialState, {
            type: actions.RESET_STATE,
            payload: null
        })
        expect(newState === initialState).toBe(false)
        expect(newState).toEqual(initialState)
    })

    it('should update state with new error state', () => {
        const newState = reducer(initialState, {
            type: actions.SET_ERROR,
            payload: 'new error'
        })
        expect(newState === initialState).toBe(false)
        expect(newState).toEqual({
            ...initialState,
            error: 'new error'
        })
    })

    it('should update state with new repo state', () => {
        const repoContainer = {
            pageInfo: {
                hasNextPage: true,
                endCursor: 'new cursor'
            },
            repos: [{
                id: 1
            }]
        }
        const newState = reducer(initialState, {
            type: actions.GET_REPOS,
            payload: repoContainer
        })
        expect(newState === initialState).toBe(false)
        expect(newState).toEqual({
            ...initialState,
            repoContainer
        })
    })

    it('should update state with new commit state', () => {
        const commitContainer = {
            repo: 'repo name',
            pageInfo: {
                hasNextPage: true,
                endCursor: 'new cursor'
            },
            commits: [{
                id: 1
            }]
        }
        const newState = reducer(initialState, {
            type: actions.GET_COMMITS,
            payload: commitContainer
        })
        expect(newState === initialState).toBe(false)
        expect(newState).toEqual({
            ...initialState,
            commitContainer
        })
    })

    it('should update state to reset commits', () => {
        const state = {
            ...initialState,
            commitContainer: {
                repo: 'repo name',
                pageInfo: {
                    hasNextPage: true,
                    endCursor: 'new cursor'
                },
                commits: [{
                    id: 1
                }]
            }
        } 
        const newState = reducer(state, {
            type: actions.RESET_COMMITS,
            payload: null
        })
        expect(newState === state).toBe(false)
        expect(newState.commitContainer === state.commitContainer).toBe(false)
        expect(newState).toEqual({
            ...state,
            commitContainer: initialState.commitContainer
        })
    })

    it('should return the state as is if no matched action type', () => {
        const newState = reducer(initialState, {
            type: 'SELECT_USERRR',
            payload: 'new username'
        })
        expect(newState === initialState).toBe(true)
        expect(newState).toEqual({...initialState})
    })

})