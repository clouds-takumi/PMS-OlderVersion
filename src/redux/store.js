import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import commonLayoutReducer from '../layouts/common-layout/redux/reducer'

export default createStore(
  combineReducers({reducer, commonLayoutReducer}),
  composeWithDevTools(applyMiddleware(thunk))
)
