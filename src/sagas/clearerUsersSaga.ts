import { takeEvery, fork } from "redux-saga/effects";
import requestSaga from "../util/requestSaga";
import { getClearerUsersAction } from "../store/clearerUsers/actions";
import getClearerUsers from "../services/clearerUsersService";
import { GET_CLEARER_USERS } from "../store/clearerUsers/action-types";

function* getCoWorkers(): Generator<any> {
  console.log("getCoWorkers");

  yield fork(() => requestSaga(getClearerUsersAction, () => getClearerUsers()));
}

function* clearerUsersSaga(): Generator<any> {
  yield takeEvery(GET_CLEARER_USERS.REQUEST, getCoWorkers);
}

export default clearerUsersSaga;
