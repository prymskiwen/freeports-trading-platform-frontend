/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../../../util/@reduxjs/toolkit";
import { useInjectReducer } from "../../../util/redux-injectors";
import { SnackbarState } from "./types";

export const initialState: SnackbarState = {
  message: "",
  type: "success",
  showSnackbar: false,
};

const slice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    hideSnackbar(state) {
      state.showSnackbar = false;
    },
    showSnackbar(
      state,
      action: PayloadAction<{ message: string; type: string }>
    ) {
      console.log("Show snackbar action", action);
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.showSnackbar = true;
    },
  },
});

export const { actions: snackbarActions, reducer } = slice;

export const useSnackbarSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
