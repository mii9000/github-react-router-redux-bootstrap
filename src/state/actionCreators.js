import * as actions from "./actions"
import store from "../state/store"
import { fetchRepos, fetchCommits } from '../services/github'

//TODO change these to connect with react-redux
export const setUsername = (username) => store.dispatch({type: actions.SELECT_USER, payload: username})

export const resetState = () => store.dispatch({type: actions.RESET_STATE, payload: null})

const loadRepos = (repoContainer) => ({type: actions.GET_REPOS, payload: repoContainer})

const loadCommits = (commitContainer) => ({type: actions.GET_COMMITS, payload: commitContainer})

const cleanCommits = () => ({type: actions.RESET_COMMITS, payload: null})

const showError = (err) => ({type: actions.SET_ERROR, payload: err})

const showLoader = (show) => ({type: actions.SHOW_LOADING, payload: show})

export const getRepos = (username, endCursor = null) => {
    return async (dispatch) => {
        dispatch(showLoader(true))
        try {
            const repoContainer = await fetchRepos(username, endCursor)
            dispatch(loadRepos(repoContainer))
            dispatch(showLoader(false))            
        } catch (error) {
            dispatch(showLoader(false))
            dispatch(showError(error.message))
        }
    }
}

export const resetCommits = (username, repo) => {
    return (dispatch) => {
        dispatch(cleanCommits())
    }
}

export const getCommits = (username, repo, endCursor = null) => {
    return async (dispatch) => {
        dispatch(showLoader(true))
        try {
            const commitContainer = await fetchCommits(username, repo, endCursor)
            dispatch(loadCommits(commitContainer))
            dispatch(showLoader(false))            
        } catch (error) {
            dispatch(showLoader(false))
            dispatch(showError(error.message))
        }        
    }
}
