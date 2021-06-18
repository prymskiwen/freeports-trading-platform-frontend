import { put, call } from "redux-saga/effects";
import ReduxAction from "../store/redux-action";
import ApiFunction from "../types/ApiFunction";

interface Entity {
  request: (payload?: any) => ReduxAction;
  success: (payload?: any) => ReduxAction;
  failure: (payload?: any) => ReduxAction;
}
export default function* requestSaga<T>(
  entity: Entity,
  apiFn: ApiFunction<T>
): Generator<any> {
  try {
    const response = yield call(apiFn);
    console.log("Response in saga ", response);
    yield put(entity.success(response));
  } catch (error) {
    yield put(entity.failure(error));
  }
}
