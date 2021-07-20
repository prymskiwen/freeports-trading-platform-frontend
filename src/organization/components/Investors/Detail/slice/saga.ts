import { takeEvery, call, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Investor from "../../../../../types/Investor";
import TradeRequest from "../../../../../types/TradeRequest";

import { investorDetailActions as actions } from ".";

import {
  getInvestor,
  getTradeRequests,
} from "../../../../../services/investorService";
import { snackbarActions } from "../../../../../components/Snackbar/slice";

export function* retrieveInvestor({
  payload,
}: PayloadAction<{
  organizationId: string;
  deskId: string;
  investorId: string;
}>): Generator<any> {
  try {
    const response = yield call(
      getInvestor,
      payload.organizationId,
      payload.deskId,
      payload.investorId
    );
    if (response) yield put(actions.getInvestorSuccess(response as Investor));
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.message,
        type: "error",
      })
    );
  }
}

export function* retrieveTradeRequests({
  payload,
}: PayloadAction<{
  organizationId: string;
  deskId: string;
  investorId: string;
}>): Generator<any> {
  try {
    const response = yield call(
      getTradeRequests,
      payload.organizationId,
      payload.deskId,
      payload.investorId
    );
    if (response)
      yield put(
        actions.getTradeRequestsSuccess(response as Array<TradeRequest>)
      );
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.message,
        type: "error",
      })
    );
  }
}
export function* investorDetailSaga(): Generator<any> {
  yield takeEvery(actions.getInvestor, retrieveInvestor);
  yield takeEvery(actions.getTradeRequests, retrieveTradeRequests);
}
