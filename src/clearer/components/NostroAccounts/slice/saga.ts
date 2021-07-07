import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Account from "../../../../types/Account";

import { accountsActions as actions } from ".";

import {
  getAllAccounts,
  createAccount,
} from "../../../../services/accountService";

export function* getAccounts(): Generator<any> {
  try {
    const response = yield call(getAllAccounts);
    if (response) yield put(actions.getProfileSuccess(response as Account[]));
  } catch (error) {
    console.log("error", error);
  }
}

export function* addAccount({
  payload,
}: PayloadAction<Account>): Generator<any> {
  try {
    const response = yield call(createAccount, payload);
    console.log(response);
    if (response) yield put(actions.addAccountSuccess(response as string));
  } catch (error) {
    console.log("error", error);
  }
}
export function* accountsSaga(): Generator<any> {
  yield takeLatest(actions.getAccounts, getAccounts);
  yield takeEvery(actions.addAccount, addAccount);
}
