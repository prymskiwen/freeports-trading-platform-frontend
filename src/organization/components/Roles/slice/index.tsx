/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../util/redux-injectors";
import Role from "../../../../types/Role";
import Permission from "../../../../types/Permission";
import { rolesSaga } from "./saga";
import { OrgRolesState } from "./types";

export const initialState: OrgRolesState = {
  orgRoles: [],
  multiDeskRoles: [],
  deskRoles: [],
  orgPermissions: [],
  multiDeskPermissions: [],
  deskPermissions: [],
  orgRolesLoading: false,
  multiDeskRolesLoading: false,
  deskRolesLoading: false,
  orgPermissionsLoading: false,
  multiDeskPermissionsLoading: false,
  deskPermissionsLoading: false,
  updating: false,
  deleting: false,
};

const slice = createSlice({
  name: "orgRoles",
  initialState,
  reducers: {
    getOrgRoles(state, action: PayloadAction<string>) {
      state.orgRolesLoading = true;
      state.orgRoles = [];
    },
    getOrgRolesSuccess(state, action: PayloadAction<Role[]>) {
      state.orgRolesLoading = false;
      state.orgRoles = action.payload;
    },
    getMultiDeskRoles(state, action: PayloadAction<string>) {
      state.multiDeskRolesLoading = true;
      state.multiDeskRoles = [];
    },
    getMultiDeskRolesSuccess(state, action: PayloadAction<Role[]>) {
      state.multiDeskRolesLoading = false;
      state.multiDeskRoles = action.payload;
    },
    getDeskRoles(state, action: PayloadAction<string>) {
      state.deskRolesLoading = true;
      state.deskRoles = [];
    },
    getDeskRolesSuccess(state, action: PayloadAction<Role[]>) {
      state.deskRolesLoading = false;
      state.deskRoles = action.payload;
    },
    getOrgPermissions(state, action: PayloadAction<string>) {
      state.orgPermissionsLoading = true;
      state.orgPermissions = [];
    },
    getOrgPermissionsSuccess(state, action: PayloadAction<Permission[]>) {
      state.orgPermissionsLoading = false;
      state.orgPermissions = action.payload;
    },
    getMultiDeskPermissions(
      state,
      action: PayloadAction<{ organizationId: string; deskId?: string }>
    ) {
      state.multiDeskPermissionsLoading = true;
      state.multiDeskPermissions = [];
    },
    getMultiDeskPermissionsSuccess(state, action: PayloadAction<Permission[]>) {
      state.multiDeskPermissionsLoading = false;
      state.multiDeskPermissions = action.payload;
    },
    getDeskPermissions(
      state,
      action: PayloadAction<{ organizationId: string; deskId?: string }>
    ) {
      state.deskPermissionsLoading = true;
      state.deskPermissions = [];
    },
    getDeskPermissionsSuccess(state, action: PayloadAction<Permission[]>) {
      state.deskPermissionsLoading = false;
      state.deskPermissions = action.payload;
    },
  },
});

export const { actions: rolesActions, reducer } = slice;

export const useRolesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: rolesSaga });
  (window as any).action = slice.actions;
  return { actions: slice.actions };
};
