/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../../../../../util/@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../util/redux-injectors";
import Account from "../../../../../types/Account";
import { accountDetailSaga } from "./saga";
import { AccountDetailState } from "./types";

const defaultAccount = {
  id: "",
  name: "",
  currency: "CHF",
  type: "fiat",
  balance: 0,
  iban: "",
  publicAddress: "",
  vaultWalletId: "",
};

export const initialState: AccountDetailState = {
  selectedAccount: defaultAccount,
  loading: false,
};

const slice = createSlice({
  name: "accountDetail",
  initialState,
  reducers: {
    getAccount(state, action: PayloadAction<string>) {
      state.loading = true;
      state.selectedAccount = defaultAccount;
    },
    getAccountSuccess(state, action: PayloadAction<Account>) {
      state.loading = false;
      state.selectedAccount = action.payload;
    },
  },
});

export const { actions: accountDetailActions, reducer } = slice;

export const useAccountDetailSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: accountDetailSaga });
  (window as any).action = slice.actions;
  return { actions: slice.actions };
};
