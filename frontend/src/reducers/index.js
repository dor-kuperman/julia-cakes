import { combineReducers } from 'redux'
import cakeReducer from './cakeReducer'
import userReducer from './userReducer'

export default combineReducers({
    cakes: cakeReducer,
    user: userReducer
});