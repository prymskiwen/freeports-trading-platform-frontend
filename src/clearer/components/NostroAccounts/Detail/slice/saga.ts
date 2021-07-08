import { takeEvery, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Account from "../../../../../types/Account";

import { accountDetailActions as actions } from ".";

import { getAccount } from "../../../../../services/accountService";
import { snackbarActions } from "../../../../../components/Snackbar/slice";

export function* retrieveAccount({
  payload,
}: PayloadAction<string>): Generator<any> {
  try {
    const response = yield call(getAccount, payload);
    if (response) yield put(actions.getAccountSuccess(response as Account));
  } catch (error) {
    snackbarActions.showSnackbar({
      message: error.message,
      type: "error",
    });
  }
}

export function* accountDetailSaga(): Generator<any> {
  yield takeEvery(actions.getAccount, retrieveAccount);
}
