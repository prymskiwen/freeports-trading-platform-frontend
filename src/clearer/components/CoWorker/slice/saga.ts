import { takeEvery, call, put } from "redux-saga/effects";

import { coWorkActions as actions } from ".";

import getClearerUsers from "../../../../services/clearerUsersService";
import PaginatedResponse from "../../../../types/PaginatedResponse";
import User from "../../../../types/User";

export function* getCoWorkers(): Generator<any> {
  try {
    const response = yield call(getClearerUsers);
    yield put(
      actions.getCoWorkersSuccess((response as PaginatedResponse<User>).content)
    );
  } catch (error) {
    console.log("error", error);
  }
}

export function* coWorkersSaga(): Generator<any> {
  yield takeEvery(actions.getCoWorkers, getClearerUsers);
}
