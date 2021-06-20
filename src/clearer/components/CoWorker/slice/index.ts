/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import User from "../../../../types/User";
import { createSlice } from "../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../util/redux-injectors";
import { coWorkersSaga } from "./saga";
import { CoWorkersState } from "./types";

export const initialState: CoWorkersState = {
  coWorkers: [],
  loading: false,
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
      state.loading = true;
      state.coWorkers = action.payload;
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
