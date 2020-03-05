import { SIDERCOLLAPSED, USERINFO } from './action-types'

const initialState = {
  collapsed: false,
  userInfo: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIDERCOLLAPSED:
      return { ...state, collapsed: action.collapsed }
    case USERINFO:
      return { ...state, userInfo: action.userInfo }
    default:
      return state
  }
}
