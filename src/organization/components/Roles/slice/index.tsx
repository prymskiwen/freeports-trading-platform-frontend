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
  roles: [],
  permissions: [],
  rolesLoading: false,
  permissionsLoading: false,
  updating: false,
  deleting: false,
};

const slice = createSlice({
  name: "orgRoles",
  initialState,
  reducers: {
    getRoles(state, action: PayloadAction<string>) {
      state.rolesLoading = true;
      state.roles = [];
    },
    getRolesSuccess(state, action: PayloadAction<Role[]>) {
      state.rolesLoading = false;
      state.roles = action.payload;
    },
    removeRole(
      state,
      action: PayloadAction<{ organizationId: string; roleId: string }>
    ) {
      state.deleting = true;
    },
    removeRoleSuccess(state, action: PayloadAction<string>) {
      state.deleting = false;
    },
    getPermissions(state, action: PayloadAction<string>) {
      state.permissionsLoading = true;
      state.permissions = [];
    },
    getPermissionsSuccess(state, action: PayloadAction<Permission[]>) {
      state.permissionsLoading = false;
      state.permissions = action.payload;
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
