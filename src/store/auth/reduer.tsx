import Lockr from "lockr";

import axios from "../../util/axios";
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
  isOTPDefined: false,
  loading: false,
  error: "",
};

function login(state: any, payload: any) {
  const { accessToken } = payload.token;

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return {
    ...state,
    isSignInAuthenticated: true,
    isOTPDefined: payload.isOTPDefined,
  };
}
interface LoginUserResponseType {
  id: string;
  nickname: string;
  email: string;
}
interface LoginTokenResponseType {
  tokenType: string;
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
  refreshTokenExpires: string;
}
interface LoginResponseType {
  user: LoginUserResponseType;
  token: LoginTokenResponseType;
  isOTPDefined: boolean;
}

function setIdentity(data: LoginResponseType) {
  Lockr.set("AUTH_TOKEN", data.token.accessToken);
  Lockr.set("USER_DATA", {
    id: data.user.id,
    email: data.user.email,
    nickname: data.user.nickname,
  });
  Lockr.set("IS_OTP_DEFINED", data.isOTPDefined);
}

function checkOTP(state: any, payload: any) {
  const accessToken = "test";

  Lockr.set("2fa_access_token", accessToken);

  return {
    ...state,
    isAuthenticated: true,
  };
}

function checkAuth(state: any) {
  const newState = {
    ...state,
    isSignInAuthenticated: !!Lockr.get("login_access_token"),
    isAuthenticated: !!Lockr.get("2fa_access_token"),
    isOTPDefined: !!Lockr.get("IS_OTP_DEFINED"),
  };

  if (state.isAuthenticated) {
    const bearer = `Bearer ${Lockr.get("ACCESS_TOKEN")}`;
    axios.defaults.headers.common.Authorization = bearer;
  }

  return newState;
}

function logout(state: any) {
  Lockr.rm("login_access_token");
  Lockr.rm("2fa_access_token");

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
      setIdentity(payload);
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
