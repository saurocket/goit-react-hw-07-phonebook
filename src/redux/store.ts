import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {phoneReducer} from "./phoneReducer";


let reducers = combineReducers({
  phone: phoneReducer
})



type RootReducer = typeof reducers
export type AppStateType = ReturnType<RootReducer>

export type BaseThunkType<A extends Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>
export type InferActionTypes<T> = T extends {[key: string]: (...arg:any[]) => infer U } ? U: never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));

export type MainStateType  = typeof store