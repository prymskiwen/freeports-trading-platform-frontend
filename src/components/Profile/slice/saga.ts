import { takeEvery, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Lockr from "lockr";

import { profileActions as actions } from ".";

import { addPublicKey, getUserProfile } from "../../../services/profileService";
import { SavedKeyObject, saveKey } from "../../../util/keyStore/keystore";
import { publicKeyToString } from "../../../util/keyStore/functions";

export function* getProfile(): Generator<any> {
  try {
    const { id, organizationId } = Lockr.get("USER_DATA");
    const response = yield call(getUserProfile, organizationId, id);
    if (response) yield put(actions.getProfileSuccess(response));
  } catch (error) {
    console.log("error", error);
  }
}

export function* addPublicKeySaga({
  payload: { publicKey, privateKey, name },
}: PayloadAction<SavedKeyObject>): Generator<any> {
  try {
    const keyString = yield call(publicKeyToString, publicKey);
    const response = yield call(addPublicKey, keyString as string, name);

    const results = yield call(saveKey, publicKey, privateKey, name);

    // addToKeyList(action.payload);
    if (response) yield put(actions.addPublicKeySuccess());
  } catch (error) {
    console.log("error", error);
  }
}

export function* profileSaga(): Generator<any> {
  yield takeEvery(actions.getProfile, getProfile);
  yield takeEvery(actions.addPublicKey, addPublicKeySaga);
}
