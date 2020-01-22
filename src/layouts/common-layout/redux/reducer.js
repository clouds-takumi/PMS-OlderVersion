import { SIDERCOLLAPSED } from './action-types'

const initialState = {
  collapsed: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIDERCOLLAPSED:
      return { ...state, collapsed: action.collapsed }
    default:
      return state
  }
}
