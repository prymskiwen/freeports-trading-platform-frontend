import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "../sagas";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

// Middleware and store enhancers
const enhancers = [applyMiddleware(sagaMiddleware)];

if (process.env.NODE_ENV !== "production") {
  enhancers.push(applyMiddleware(createLogger()));
  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const store = createStore(rootReducer, initialState, compose(...enhancers));

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
