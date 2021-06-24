import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.coWorkers || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectCoWorkers = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.coWorkers
);

export const selectIsFormLoading = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.formLoading
);
export const selectIsLoading = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.loading
);

export const selectSelectedCoWorker = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.selectedCoWorker
);
export const selectSuspendStateLoading = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.suspendStateLoading
);

export const selectShowSnackbar = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.showSnackbar
);
