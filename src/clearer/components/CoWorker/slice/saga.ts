import { takeEvery, call, put } from "redux-saga/effects";

import { coWorkActions as actions } from ".";

import getClearerUsers from "../../../../services/clearerUsersService";
import PaginatedResponse from "../../../../types/PaginatedResponse";
import User from "../../../../types/User";

export function* getCoWorkers(): Generator<any> {
  console.log("getCoWorkers");

  try {
    const response: PaginatedResponse<User> = yield call(getClearerUsers);
    yield put(actions.getCoWorkersSuccess(response.content));
  } catch (error) {
    console.log("error", error);
  }
}

export function* clearerUsersSaga(): Generator<any> {
  yield takeEvery(actions.getCoWorkers, getClearerUsers);
}
