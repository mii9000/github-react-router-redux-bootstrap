import * as actions from "./actions"

const initialState = {
    username: '',
    repos: [],
    selectedRepo: {},
    commits: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SELECT_USER:
            return { ...state, username: action.payload };        
        case actions.SELECT_REPO:
            return { ...state, selectedRepo: action.payload }
        case actions.GET_REPOS:
            return { ...state, repos: state.repos.concat(action.payload) }
        case actions.GET_COMMITS:
            return { ...state, commits: state.commits.concat(action.payload) }
        default:
            return state
    }
}