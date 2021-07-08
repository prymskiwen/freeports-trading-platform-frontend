import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.accountDetail || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectAccountDetail = createSelector(
  [selectDomain],
  (accountsState) => ({
    selectedAccount: accountsState.selectedAccount,
  })
);

export const selectIsLoading = createSelector(
  [selectDomain],
  (accountsState) => accountsState.loading
);
