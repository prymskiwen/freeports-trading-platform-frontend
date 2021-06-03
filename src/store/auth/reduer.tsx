/* eslint-disable @typescript-eslint/no-explicit-any */
// import HTTP from '../../../utils/Http';
// import Lockr from 'lockr';

import ReduxAction from "../redux-action";
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_OTP_CHECK,
  AUTH_OTP_CHECK_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
} from "./action-types";

const initialState = {
  isSignInAuthenticated: false,
  isAuthenticated: false,
  loading: false,
  error: "",
};

function login(state: any, payload: any) {
  const { accessToken } = payload.token;

  // localStorage.setItem("access_token", accessToken);

  return {
    ...state,
    isSignInAuthenticated: true,
  };
}

function checkOTP(state: any, payload: any) {
  const accessToken = "test";

  localStorage.setItem("access_token", accessToken);

  return {
    ...state,
    isAuthenticated: true,
  };
}

function checkAuth(state: any) {
  const newState = {
    ...state,
    isAuthenticated: !!localStorage.getItem("access_token"),
  };

  // if (state.isAuthenticated) {
  //   const bearer = `Bearer ${localStorage.getItem('access_token')}`
  //   HTTP.defaults.headers.common['Authorization'] = bearer;
  // }

  return newState;
}

function logout(state: any) {
  localStorage.removeItem("access_token");

  return {
    ...state,
    isSignInAuthenticated: false,
    isAuthenticated: false,
  };
}

const reducer = (
  state = initialState,
  { type, payload = null }: ReduxAction
): typeof initialState => {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...login(state, payload),
        loading: false,
      };
    case AUTH_OTP_CHECK:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case AUTH_OTP_CHECK_SUCCESS:
      return {
        ...checkOTP(state, payload),
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
      };
    case AUTH_REFRESH_TOKEN:
      return login(state, payload);
    case AUTH_CHECK:
      return checkAuth(state);
    case AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAuth = (state: any): boolean => state.auth.isAuthenticated;

export default reducer;
