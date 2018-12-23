import * as actions from "./actions"
import store from "../state/store"
import { fetchRepos, fetchCommits } from '../services/github'

export const setUsername = (username) => store.dispatch({type: actions.SELECT_USER, payload: username})

const _resetState = () => ({type: actions.RESET_STATE, payload: null})

const _getRepos = (repoContainer) => ({type: actions.GET_REPOS, payload: repoContainer})

const _loadCommits = (commitContainer) => ({type: actions.GET_COMMITS, payload: commitContainer})

const _resetCommits = () => ({type: actions.RESET_COMMITS, payload: null})

const _setError = (err) => ({type: actions.SET_ERROR, payload: err})

const _showLoader = (show) => ({type: actions.SHOW_LOADING, payload: show})

const _commitLoader = async (dispatch, username, repo, endCursor = null) => {    
    dispatch(_showLoader(true))
    try {
        const commitContainer = await fetchCommits(username, repo, endCursor)
        dispatch(_loadCommits(commitContainer))
        dispatch(_showLoader(false))            
    } catch (error) {
        dispatch(_showLoader(false))
        dispatch(_setError(error.message))
    }
}

export const setError = (error) => {
    return (dispatch) => {
        dispatch(_setError(error))
    }
}

export const getRepos = (username, endCursor = null) => {
    return async (dispatch) => {
        dispatch(_showLoader(true))
        try {
            const repoContainer = await fetchRepos(username, endCursor)
            dispatch(_getRepos(repoContainer))
            dispatch(_showLoader(false))            
        } catch (error) {
            dispatch(_showLoader(false))
            dispatch(_setError(error.message))
        }
    }
}

export const resetCommits = (username, repo) => {
    return (dispatch) => {
        dispatch(_resetCommits())
        _commitLoader(dispatch, username, repo)
    }
}

export const getCommits = (username, repo, endCursor = null) => {
    return async (dispatch) => {
        _commitLoader(dispatch, username, repo, endCursor)
    }
}

export const resetState = () => {
    return dispatch => {
        dispatch(_resetState())
    }
}
