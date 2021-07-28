import { takeEvery, call, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import TradeRequest from "../../../../../types/TradeRequest";

import { tradeDetailActions as actions } from ".";

import { getTradeRequest } from "../../../../../services/tradeService";
import { snackbarActions } from "../../../../../components/Snackbar/slice";

export function* retrieveTradeRequest({
  payload,
}: PayloadAction<{
  organizationId: string;
  deskId: string;
  investorId: string;
  tradeId: string;
}>): Generator<any> {
  try {
    const response = yield call(
      getTradeRequest,
      payload.organizationId,
      payload.deskId,
      payload.investorId,
      payload.tradeId
    );
    if (response)
      yield put(actions.getTradeRequestDetailSuccess(response as TradeRequest));
  } catch (error) {
    yield put(
      snackbarActions.showSnackbar({
        message: error.data.message,
        type: "error",
      })
    );
  }
}

export function* tradeDetailSaga(): Generator<any> {
  yield takeEvery(actions.getTradeRequestDetail, retrieveTradeRequest);
}
