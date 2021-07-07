import { takeEvery, takeLatest, call, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Account from "../../../../types/Account";

import { accountsActions as actions } from ".";

import {
  getAllAccounts,
  createAccount,
  deleteAccount,
} from "../../../../services/accountService";
import { snackbarActions } from "../../../../components/Snackbar/slice";

export function* getAccounts(): Generator<any> {
  try {
    const response = yield call(getAllAccounts);
    if (response) yield put(actions.getAccountsSuccess(response as Account[]));
  } catch (error) {
    console.log("error", error);
  }
}

export function* addAccount({
  payload,
}: PayloadAction<Account>): Generator<any> {
  try {
    const response = yield call(createAccount, payload);
    if (response) {
      yield put(actions.addAccountSuccess(response as string));
      yield put(
        snackbarActions.showSnackbar({
          message: "Account has been created successfully",
          type: "success",
        })
      );
      yield put(actions.getAccounts());
      yield take(actions.getAccountsSuccess);
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* removeAccount({
  payload,
}: PayloadAction<string>): Generator<any> {
  try {
    const response = yield call(deleteAccount, payload);
    if (response) {
      yield put(actions.removeAccountSuccess(response as string));
      yield put(
        snackbarActions.showSnackbar({
          message: "Account has been deleted successfully",
          type: "success",
        })
      );
      yield put(actions.getAccounts());
      yield take(actions.getAccountsSuccess);
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* accountsSaga(): Generator<any> {
  yield takeLatest(actions.getAccounts, getAccounts);
  yield takeEvery(actions.addAccount, addAccount);
  yield takeEvery(actions.removeAccount, removeAccount);
}
