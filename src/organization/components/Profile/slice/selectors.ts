import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.profileForm || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectProfile = createSelector(
  [selectDomain],
  (profileFormState) => ({
    profile: profileFormState.profile,
    loading: profileFormState.loading,
  })
);
