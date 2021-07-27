import { takeEvery, call, put } from "redux-saga/effects";

import { coWorkActions as actions } from ".";

import getClearerRoles from "../../../../services/roleService";
import { snackbarActions } from "../../../../components/Snackbar/slice";
import { RoleType } from "../../Roles";

export function* getRoles(): Generator<any> {
  try {
    const response = yield call(getClearerRoles);
    yield put(actions.getRolesSuccess(response as Array<RoleType>));
  } catch (error) {
    snackbarActions.showSnackbar({
      message: error.data.message,
      type: "error",
    });
  }
}

export function* coWorkerFormSaga(): Generator<any> {
  yield takeEvery(actions.getRoles, getRoles);
}
