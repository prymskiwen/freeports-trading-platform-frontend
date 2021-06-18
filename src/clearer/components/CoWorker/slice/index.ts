/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import User from "../../../../types/User";
import { createSlice } from "../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../util/redux-injectors";
import { clearerUsersSaga } from "./saga";
import { CoWorkerState } from "./types";

export const initialState: CoWorkerState = {
  coWorkers: [],
  loading: false,
};

const slice = createSlice({
  name: "coWorker",
  initialState,
  reducers: {
    getCoWorkers(state) {
      state.loading = true;
      state.coWorkers = [];
    },
    getCoWorkersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = true;
      state.coWorkers = [];
    },
  },
});

export const { actions: coWorkActions, reducer } = slice;

export const useCoWorkerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clearerUsersSaga });
  return { actions: slice.actions };
};
