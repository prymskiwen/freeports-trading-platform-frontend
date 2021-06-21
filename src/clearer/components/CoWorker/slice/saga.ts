import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, call, put } from "redux-saga/effects";

import { coWorkActions as actions } from ".";

import getClearerUsers, {
  createClearerUser,
} from "../../../../services/clearerUsersService";
import PaginatedResponse from "../../../../types/PaginatedResponse";
import { ResourceCreatedResponse } from "../../../../types/ResourceCreatedResponse";
import User from "../../../../types/User";

export function* getCoWorkers(): Generator<any> {
  try {
    const response = yield call(getClearerUsers);
    yield put(
      actions.getCoWorkersSuccess((response as PaginatedResponse<User>).content)
    );
  } catch (error) {
    console.log("error", error);
  }
}

export function* createCoWorker({
  payload,
}: PayloadAction<User>): Generator<any> {
  try {
    console.log("Create coworker saga ", payload);
    const response = yield call(createClearerUser, payload);
    yield put(
      actions.createCoWorkersSuccess(response as ResourceCreatedResponse)
    );
    yield put(actions.getCoWorkers());
  } catch (error) {
    console.log("error", error);
  }
}

export function* coWorkersSaga(): Generator<any> {
  yield takeEvery(actions.getCoWorkers, getCoWorkers);
  yield takeEvery(actions.createCoWorker, createCoWorker);
}
