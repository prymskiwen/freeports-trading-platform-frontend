import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";
import { RootState } from "../../../../util/types/RootState";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.orgRoles || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectOrgRoles = createSelector(
  [selectDomain],
  (rolesState) => rolesState.orgRoles
);

export const selectIsOrgRolesLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.orgRolesLoading
);

export const selectMultiDeskRoles = createSelector(
  [selectDomain],
  (rolesState) => rolesState.multiDeskRoles
);

export const selectIsMultiDeskRolesLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.multiDeskRolesLoading
);

export const selectDeskRoles = createSelector(
  [selectDomain],
  (rolesState) => rolesState.deskRoles
);

export const selectIsDeskRolesLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.deskRolesLoading
);

export const selectIsRoleUpdating = createSelector(
  [selectDomain],
  (rolesState) => rolesState.updating
);

export const selectIsRoleRemoving = createSelector(
  [selectDomain],
  (rolesState) => rolesState.deleting
);

export const selectOrgPermissions = createSelector(
  [selectDomain],
  (rolesState) => rolesState.orgPermissions
);

export const selectIsOrgPermissionsLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.orgPermissionsLoading
);

export const selectMultiDeskPermissions = createSelector(
  [selectDomain],
  (rolesState) => rolesState.multiDeskPermissions
);

export const selectIsMultiDeskPermissionsLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.multiDeskPermissionsLoading
);

export const selectDeskPermissions = createSelector(
  [selectDomain],
  (rolesState) => rolesState.deskPermissions
);

export const selectIsDeskPermissionsLoading = createSelector(
  [selectDomain],
  (rolesState) => rolesState.deskPermissionsLoading
);
