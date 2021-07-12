import { takeEvery, call, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Desk from "../../../../../types/Desk";
import PaginatedResponse from "../../../../../types/PaginatedResponse";

import { deskDetailActions as actions } from ".";

import { getDesk } from "../../../../../services/deskService";
import { snackbarActions } from "../../../../../components/Snackbar/slice";

export function* retrieveDesk({
  payload,
}: PayloadAction<{ organizationId: string; deskId: string }>): Generator<any> {
  try {
    const response = yield call(
      getDesk,
      payload.organizationId,
      payload.deskId
    );
    if (response) yield put(actions.getDeskSuccess(response as Desk));
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.message,
        type: "error",
      })
    );
  }
}

export function* deskDetailSaga(): Generator<any> {
  yield takeEvery(actions.getDesk, retrieveDesk);
}
