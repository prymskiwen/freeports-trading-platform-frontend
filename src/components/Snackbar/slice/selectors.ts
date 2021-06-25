import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.snackbar || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectShowSnackbar = createSelector(
  [selectDomain],
  (snackBarState) => snackBarState.showSnackbar
);

export const selectSnackbarMessage = createSelector(
  [selectDomain],
  (snackBarState) => snackBarState.message
);

export const selectSnackbarType = createSelector(
  [selectDomain],
  (snackBarState) => snackBarState.type
);
