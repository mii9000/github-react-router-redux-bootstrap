import * as actions from "./actions"
import store from "../state/store"
import { fetchRepos } from '../services/githubService'

export const setUsername = (username) => store.dispatch({type: actions.SELECT_USER, payload: username})

export const resetState = () => store.dispatch({type: actions.RESET_STATE, payload: null})

export const loadRepos = (repos) => ({type: actions.GET_REPOS, payload: repos})

export const showLoader = (show) => ({type: actions.SHOW_LOADING, payload: show})

export const showError = (err) => ({type: actions.SET_ERROR, payload: err})

export const getRepos = (username) => {
    return async (dispatch) => {
        dispatch(showLoader(true))
        try {
            const repos = await fetchRepos(username)
            dispatch(loadRepos(repos))
            dispatch(showLoader(false))            
        } catch (error) {
            dispatch(showLoader(false))
            dispatch(showError(error.message))
        }
    }
}
  