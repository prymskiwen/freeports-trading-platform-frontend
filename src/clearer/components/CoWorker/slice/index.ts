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
};
export const initialState: CoWorkersState = {
  coWorkers: [],
  selectedCoWorker: defaultCoWorker,
  loading: false,
  formLoading: false,
};

const slice = createSlice({
  name: "coWorkers",
  initialState,
  reducers: {
    getCoWorkers(state) {
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
    },
    selectCoWorker(state, action: PayloadAction<User>) {
      console.log("Selected coworker ", action.payload);
      // state.selectedCoWorker = action.payload;
      state.formLoading = true;
    },
    selectCoWorkerSuccess(state, action: PayloadAction<User>) {
      console.log("Selected coworker sucss ", action.payload);
      state.selectedCoWorker = action.payload;
      state.formLoading = false;
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
