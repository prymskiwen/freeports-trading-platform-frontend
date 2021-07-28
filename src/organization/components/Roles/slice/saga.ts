import { takeEvery, takeLatest, call, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Role from "../../../../types/Role";

import { rolesActions as actions } from ".";

import {
  getOrgRoles,
  deleteOrgRole,
  getOrgPermissions,
} from "../../../../services/roleService";
import { snackbarActions } from "../../../../components/Snackbar/slice";

export function* getRoles({ payload }: PayloadAction<string>): Generator<any> {
  try {
    const response = yield call(getOrgRoles, payload);
    if (response) yield put(actions.getRolesSuccess(response as Role[]));
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.data.message,
        type: "error",
      })
    );
  }
}

export function* removeRole({
  payload,
}: PayloadAction<{
  organizationId: string;
  roleId: string;
}>): Generator<any> {
  try {
    const response = yield call(
      deleteOrgRole,
      payload.organizationId,
      payload.roleId
    );
    if (response) {
      yield put(actions.removeRoleSuccess(response as string));
      yield put(
        snackbarActions.showSnackbar({
          message: "Role has been deleted successfully",
          type: "success",
        })
      );
      yield put(actions.getRoles(payload.organizationId));
      yield take(actions.getRolesSuccess);
    }
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.data.message,
        type: "error",
      })
    );
  }
}

export function* getPermissions({
  payload,
}: PayloadAction<string>): Generator<any> {
  try {
    const response = yield call(getOrgPermissions, payload);
    if (response) yield put(actions.getRolesSuccess(response as Role[]));
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.data.message,
        type: "error",
      })
    );
  }
}
export function* rolesSaga(): Generator<any> {
  yield takeEvery(actions.getRoles, getRoles);
  yield takeEvery(actions.removeRole, removeRole);
  yield takeEvery(actions.getPermissions, getPermissions);
}
