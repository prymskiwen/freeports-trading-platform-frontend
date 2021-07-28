import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.trades || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectTradeRequests = createSelector(
  [selectDomain],
  (tradesState) => tradesState.tradeRequests
);

export const selectIsTradeRequestsLoading = createSelector(
  [selectDomain],
  (tradesState) => tradesState.loading
);
