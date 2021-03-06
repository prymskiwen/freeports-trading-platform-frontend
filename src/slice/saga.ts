// eslint-disable-next-line @typescript-eslint/no-empty-function

import { call, put, takeLatest } from "redux-saga/effects";
import { globalActions as actions } from ".";
import { CurrentUser } from "../types/User";
import { getClearerUser } from "../services/clearerUsersService";

function* getCurrentClearerUser(): Generator<any> {
  try {
    const userData = JSON.parse(localStorage.getItem("USER_DATA") || "{}");
    if (userData.data) {
      const user = yield call(getClearerUser, userData.data.id);

      yield put(actions.setCurrentUser(user as CurrentUser));
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* globalSaga(): Generator<any> {
  yield takeLatest(actions.getCurrentClearerUser, getCurrentClearerUser);
}
