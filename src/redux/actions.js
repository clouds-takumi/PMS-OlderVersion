import { LOGIN_SUCCESS, LOGIN_Fail, LOG_OUT } from './action-types'
import storage from '../utils/storage'

export const login_sucess = (user) => ({ type: LOGIN_SUCCESS, user })
export const login_fail = (errorMsg) => ({ type: LOGIN_Fail, errorMsg })
export const logout = () => {
    storage.removeUser()
    return { type: LOG_OUT }
}
