import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../../../store";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.githubRepoForm || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectCoWorkers = createSelector(
  [selectDomain],
  (coWorkerState) => coWorkerState.coWorkers
);
