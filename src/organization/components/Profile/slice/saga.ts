import { takeEvery, call, put, SagaReturnType } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Lockr from "lockr";

import { profileActions as actions } from ".";

import { getUserProfile } from "../../../../services/profileService";
import { encryptMegolmKeyFile } from "../../../../util/keyStore/MegolmExportEncryption";
import { keyStore } from "../../../../util/keyStore/keystore";

export function* getProfile(): Generator<any> {
  try {
    const { id, organizationId } = Lockr.get("USER_DATA");
    const response = yield call(getUserProfile, organizationId, id);
    if (response) yield put(actions.getProfileSuccess(response));
  } catch (error) {
    console.log("error", error);
  }
}

const generateKey = async (
  params: {
    name: string;
    modulusLength: number;
    publicExponent: Uint8Array;
    hash: { name: string };
  },
  usages: Array<KeyUsage>
) => {
  const keyPair = await window.crypto.subtle.generateKey(params, true, usages);

  return keyPair;
};

const exportKey = async (keyPair: any) => {
  const keyArrayBuffer = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );

  return keyArrayBuffer;
};

const arrayBufferToBase64 = (arrayBuffer: any) => {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = "";
  for (let i = 0; i < byteArray.byteLength; i += 1) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  const b64 = window.btoa(byteString);

  return b64;
};

const encryptMegolm = async (keyPem: string, passphrase: string) => {
  const encryptedKey = await encryptMegolmKeyFile(keyPem, passphrase, {});

  return encryptedKey;
};

const importKey = async (
  keyArrayBuffer: any,
  params: {
    name: string;
    modulusLength: number;
    publicExponent: Uint8Array;
    hash: { name: string };
  }
) => {
  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    keyArrayBuffer,
    params,
    false,
    ["sign"]
  );

  return privateKey;
};

const saveKey = async (keyPair: any, privateKey: string, key: string) => {
  const results = await keyStore.saveKey(keyPair.publicKey, privateKey, key);

  return results;
};

export function* createKeyPair(action: PayloadAction<any>): Generator<any> {
  try {
    const { payload } = action;
    const { key, passphrase } = payload;
    const algorithmName = "RSASSA-PKCS1-v1_5";
    const usages: Array<KeyUsage> = ["sign", "verify"];
    const params = {
      name: algorithmName,
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-256" },
    };
    const keyPair = yield call(generateKey, params, usages);
    const keyArrayBuffer = yield call(exportKey, keyPair);
    const keyPem = yield call(arrayBufferToBase64, keyArrayBuffer);
    const encryptedKey = yield call(encryptMegolm, keyPem, passphrase);

    if (encryptedKey) yield put(actions.encryptKeySuccess(encryptedKey));

    // downloadString(encryptedKey, "pem", key);

    /* const privateKey = yield call(importKey, keyArrayBuffer, params);
    const results = yield call(saveKey, keyPair, privateKey, key); */

    // addToKeyList(results);
  } catch (error) {
    console.log("error", error);
  }
}

export function* profileSaga(): Generator<any> {
  yield takeEvery(actions.getProfile, getProfile);
  yield takeEvery(actions.createKeyPair, createKeyPair);
}
