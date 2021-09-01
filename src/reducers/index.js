import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import apiReducer from './api.reducer'
import categoryReducer from './category.reducer'
import trailReducer from './trail.reducer'
import userReducer from './user.reducer'

export default combineReducers({
  authReducer,
  apiReducer,
  categoryReducer,
  trailReducer,
  userReducer,
})
