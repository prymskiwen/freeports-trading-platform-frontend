import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.coWorkerForm || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectRoles = createSelector(
  [selectDomain],
  (coWorkerFormState) => coWorkerFormState.roles
);
