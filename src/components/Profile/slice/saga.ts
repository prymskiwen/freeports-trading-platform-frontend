import { takeEvery, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Lockr from "lockr";

import { profileActions as actions } from ".";

import { getUserProfile } from "../../../services/profileService";

export function* getProfile(): Generator<any> {
  try {
    const { id, organizationId } = Lockr.get("USER_DATA");
    const response = yield call(getUserProfile, organizationId, id);
    if (response) yield put(actions.getProfileSuccess(response));
  } catch (error) {
    console.log("error", error);
  }
}

export function* profileSaga(): Generator<any> {
  yield takeEvery(actions.getProfile, getProfile);
}
