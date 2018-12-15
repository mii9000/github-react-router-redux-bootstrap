import * as actions from "./actions"
import store from "../state/store"
import { fetchRepos } from '../services/githubService'

export const setUsername = (username) => store.dispatch({type: actions.SELECT_USER, payload: username})

export const resetState = () => store.dispatch({type: actions.RESET_STATE, payload: null})

export const loadRepos = (repos) => ({type: actions.GET_REPOS, payload: repos})

export const showLoader = (show) => ({type: actions.SHOW_LOADING, payload: show})

export const getRepos = () => {
    return async (dispatch) => {
        dispatch(showLoader(true))
        const repos = await fetchRepos()
        dispatch(loadRepos(repos))
        dispatch(showLoader(false))
    }
}
  