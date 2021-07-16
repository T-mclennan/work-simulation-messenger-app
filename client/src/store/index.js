import { createStore, applyMiddleware, compose } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from '../reducers'

const middleware = [thunkMiddleware, loggerMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
    ? a => a
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
