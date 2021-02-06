import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import {LaunchDetailsReducer} from './LaunchDetailsReducer'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    launchdetails: LaunchDetailsReducer
})
// export default rootReducer
export default persistReducer(persistConfig, rootReducer)