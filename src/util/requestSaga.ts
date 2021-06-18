import { put, call } from "redux-saga/effects";
import ApiFunction from "../types/ApiFunction";

type Entity = {
  request: (payload?: any) => any;
  success: (payload?: any) => any;
  failure: (payload?: any) => any;
};
export default function* requestSaga(
  entity: Entity,
  apiFn: ApiFunction
): Generator<any> {
  try {
    const response = yield call(apiFn);
    console.log("Response in saga ", response);
    yield put(entity.success(response));
  } catch (error) {
    yield put(entity.failure(error));
  }
}
