import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'
import { boardReducer } from './boardReducer'


export const rootReducer = combineReducers({
  systemModule: systemReducer,
  boardModule : boardReducer,
  userModule: userReducer

})
