import { takeEvery, call, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Investor from "../../../../../types/Investor";
import TradeRequest from "../../../../../types/TradeRequest";

import { investorDetailActions as actions } from ".";

import {
  getInvestor,
  getTradeRequests,
  createTradeRequest,
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

export function* addTradeRequest({
  payload,
}: PayloadAction<{
  organizationId: string;
  deskId: string;
  investorId: string;
  trade: TradeRequest;
}>): Generator<any> {
  try {
    const response = yield call(
      createTradeRequest,
      payload.organizationId,
      payload.deskId,
      payload.investorId,
      payload.trade
    );
    if (response) {
      yield put(actions.addTradeRequestSuccess(response as string));
      yield put(
        snackbarActions.showSnackbar({
          message: "Trade has been created successfully",
          type: "success",
        })
      );
      yield put(
        actions.getTradeRequests({
          organizationId: payload.organizationId,
          deskId: payload.deskId,
          investorId: payload.investorId,
        })
      );
      yield take(actions.getTradeRequestsSuccess);
    }
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
  yield takeEvery(actions.addTradeRequest, addTradeRequest);
}
