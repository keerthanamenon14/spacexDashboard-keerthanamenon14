import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../_reducers'

const initialState = {}
const loggerMiddleware = createLogger()
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
)
export const persistor = persistStore(store)
export default { store, persistor }