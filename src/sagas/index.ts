import { fork } from "redux-saga/effects";

import userSaga from "./clearerUsersSaga";

export default function* rootSaga(): Generator<any> {
  yield fork(userSaga);
}
