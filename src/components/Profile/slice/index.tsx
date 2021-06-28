/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../../../util/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "../../../util/redux-injectors";
import { profileSaga } from "./saga";
import { ProfileState } from "./types";

export const initialState: ProfileState = {
  profile: {
    id: "",
    nickname: "",
    email: "",
    phone: "",
    jobTitle: "",
    avatar: "",
    suspended: false,
  },
  loading: false,
};

const slice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    getProfile(state) {
      state.loading = true;
    },
    getProfileSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.profile = action.payload;
    },
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  (window as any).action = slice.actions;
  return { actions: slice.actions };
};
