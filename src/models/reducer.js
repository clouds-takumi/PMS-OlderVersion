import { combineReducers } from 'redux'
import storage from '../utils/storage'
import { LOGIN_SUCCESS, LOGIN_Fail, LOG_OUT } from './action-types'

const initUser = storage.getUser()
function user(state = initUser, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user
        case LOGIN_Fail:
            return { ...state, errorMsg: action.errorMsg }
        case LOG_OUT:
            return {}
        default:
            return state
    }
}