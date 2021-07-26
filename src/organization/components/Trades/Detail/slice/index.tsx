/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../util/redux-injectors";
import TradeRequest from "../../../../../types/TradeRequest";
import { tradeDetailSaga } from "./saga";
import { TradeDetailState } from "./types";

const defaultTradeRequest = {
  id: "",
  accountFrom: "",
  accountTo: "",
  status: "",
  currencyFrom: "",
  currencyTo: "",
  type: "",
  quantity: "",
  limitPrice: "",
  limitTime: "",
  createdAt: "",
};

export const initialState: TradeDetailState = {
  selectedTradeRequest: defaultTradeRequest,
  loadingDetail: false,
};

const slice = createSlice({
  name: "tradeDetail",
  initialState,
  reducers: {
    getTradeRequestDetail(
      state,
      action: PayloadAction<{
        organizationId: string;
        deskId: string;
        investorId: string;
        tradeId: string;
      }>
    ) {
      state.loadingDetail = true;
      state.selectedTradeRequest = defaultTradeRequest;
    },
    getTradeRequestDetailSuccess(state, action: PayloadAction<TradeRequest>) {
      state.loadingDetail = false;
      state.selectedTradeRequest = action.payload;
    },
  },
});

export const { actions: tradeDetailActions, reducer } = slice;

export const useTradeDetailSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tradeDetailSaga });
  (window as any).action = slice.actions;
  return { actions: slice.actions };
};
