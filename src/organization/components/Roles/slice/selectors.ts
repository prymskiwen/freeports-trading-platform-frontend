import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.orgRoles || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectRoles = createSelector(
  [selectDomain],
  (rolesState) => rolesState.roles
);

export const selectIsRolesLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.rolesLoading
);

export const selectIsRoleUpdating = createSelector(
  [selectDomain],
  (rolesState) => rolesState.updating
);

export const selectIsRoleRemoving = createSelector(
  [selectDomain],
  (rolesState) => rolesState.deleting
);

export const selectPermissions = createSelector(
  [selectDomain],
  (rolesState) => rolesState.permissions
);

export const selectIsPermissionsLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.permissionsLoading
);
