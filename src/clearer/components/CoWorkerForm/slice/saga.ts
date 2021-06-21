import { takeEvery, call, put } from "redux-saga/effects";

import { coWorkActions as actions } from ".";

import getClearerRoles from "../../../../services/roleService";
import { RoleType } from "../../Roles";

export function* getRoles(): Generator<any> {
  try {
    const response = yield call(getClearerRoles);
    yield put(actions.getRolesSuccess(response as Array<RoleType>));
  } catch (error) {
    console.log("error", error);
  }
}

export function* coWorkerFormSaga(): Generator<any> {
  yield takeEvery(actions.getRoles, getRoles);
}
