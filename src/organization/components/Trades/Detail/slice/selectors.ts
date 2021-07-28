import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.tradeDetail || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectTradeRequestDetail = createSelector(
  [selectDomain],
  (tradeRequestDetailState) => tradeRequestDetailState.selectedTradeRequest
);

export const selectIsDetailLoading = createSelector(
  [selectDomain],
  (tradeRequestDetailState) => tradeRequestDetailState.loadingDetail
);
