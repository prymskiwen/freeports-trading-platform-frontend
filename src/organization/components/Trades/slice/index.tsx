/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../util/redux-injectors";
import TradeRequest from "../../../../types/TradeRequest";
import { tradesSaga } from "./saga";
import { TradesState } from "./types";

export const initialState: TradesState = {
  tradeRequests: [],
  loading: false,
};

const slice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    getTradeRequests(state) {
      state.loading = true;
      state.tradeRequests = [];
    },
    getTradeRequestsSuccess(state, action: PayloadAction<TradeRequest[]>) {
      state.loading = false;
      state.tradeRequests = action.payload;
    },
  },
});

export const { actions: tradesActions, reducer } = slice;

export const useTradesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tradesSaga });
  (window as any).action = slice.actions;
  return { actions: slice.actions };
};
