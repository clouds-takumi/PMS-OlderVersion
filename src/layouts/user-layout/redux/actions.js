import { SIDERCOLLAPSED, USERINFO } from './action-types'

export const changeSiderCollapsed = (collapsed) => ({ type: SIDERCOLLAPSED, collapsed })
export const setUserInfo = userInfo => ({ type: USERINFO, userInfo })
