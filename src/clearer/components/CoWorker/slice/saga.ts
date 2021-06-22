import { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { takeEvery, call, put, select, take } from "redux-saga/effects";

import { coWorkActions as actions } from ".";
import getClearerUsers, {
  createClearerUser,
} from "../../../../services/clearerUsersService";
import PaginatedResponse from "../../../../types/PaginatedResponse";
import { ResourceCreatedResponse } from "../../../../types/ResourceCreatedResponse";
import User from "../../../../types/User";
import { selectCoWorkers } from "./selectors";

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
}: PayloadAction<{ user: User; history: any }>): Generator<any> {
  try {
    console.log("Create coworker saga ", payload);
    const response = yield call(createClearerUser, payload.user);
    yield put(
      actions.createCoWorkersSuccess(response as ResourceCreatedResponse)
    );
    yield take(actions.getCoWorkers);

    const coWorkers = yield select(selectCoWorkers);
    console.log("Coworkers>>>>>>>>>>>>>>", coWorkers);
    const selectedCoWorker = (coWorkers as Array<User>).find(
      (c) => c.id === (response as ResourceCreatedResponse).id
    );
    console.log("Saga selected coWorker", selectedCoWorker);
    if (selectedCoWorker) {
      yield put(actions.selectCoWorker(selectedCoWorker));
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* coWorkersSaga(): Generator<any> {
  yield takeEvery(actions.getCoWorkers, getCoWorkers);
  yield takeEvery(actions.createCoWorker, createCoWorker);
}
