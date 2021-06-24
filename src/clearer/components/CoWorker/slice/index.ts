/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import { ResourceCreatedResponse } from "../../../../types/ResourceCreatedResponse";
import User from "../../../../types/User";
import { createSlice } from "../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../util/redux-injectors";
import { coWorkersSaga } from "./saga";
import { CoWorkersState } from "./types";

const defaultCoWorker = {
  roles: [""],
  nickname: "",
  phone: "",
  email: "",
  avatar: "",
  jobTitle: "",
  suspended: false,
};
export const initialState: CoWorkersState = {
  coWorkers: [],
  selectedCoWorker: defaultCoWorker,
  loading: false,
  formLoading: false,
  suspendStateLoading: false,
  showSnackbar: false,
};

const slice = createSlice({
  name: "coWorkers",
  initialState,
  reducers: {
    getCoWorkers(state, action?: PayloadAction<{ search?: string }>) {
      state.loading = true;
      state.coWorkers = [];
    },
    getCoWorkersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.coWorkers = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCoWorker(state, action: PayloadAction<{ user: User }>) {
      state.formLoading = true;
    },
    createCoWorkersSuccess(
      state,
      action: PayloadAction<ResourceCreatedResponse>
    ) {
      state.formLoading = false;
      state.showSnackbar = true;
    },
    updateCoWorker(state, action: PayloadAction<{ user: User; id: string }>) {
      state.formLoading = true;
    },
    updateCoWorkersSuccess(state, action: any) {
      state.formLoading = false;
      state.showSnackbar = true;
    },
    selectCoWorker(state, action: PayloadAction<User>) {
      state.formLoading = true;
    },
    selectCoWorkerSuccess(state, action: PayloadAction<User>) {
      state.selectedCoWorker = action.payload;
      state.formLoading = false;
    },
    suspendCoWorker(state, action: PayloadAction<{ id: string }>) {
      state.suspendStateLoading = true;
    },
    suspendCoWorkerSuccess(state) {
      state.suspendStateLoading = false;
      state.showSnackbar = true;
    },
    resumeCoWorker(state, action: PayloadAction<{ id: string }>) {
      state.suspendStateLoading = true;
    },
    resumeCoWorkerSuccess(state) {
      state.suspendStateLoading = false;
      state.showSnackbar = true;
    },
  },
});

export const { actions: coWorkActions, reducer } = slice;

export const useCoWorkersSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: coWorkersSaga });
  (window as any).action = slice.actions;
  return { actions: slice.actions };
};
