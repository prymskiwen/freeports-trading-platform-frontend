/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import ReduxAction from "../redux-action";

import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  QR_CODE_GENERATE,
  AUTH_OTP_CHECK,
  AUTH_OTP_CHECK_SUCCESS,
  AUTH_OTP_CHECK_FAILED,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_USER,
} from "./action-types";

function authCheck(): ReduxAction {
  return {
    type: AUTH_CHECK,
  };
}

function authLogin(): ReduxAction {
  return {
    type: AUTH_LOGIN,
  };
}

function authLoginSuccess(payload: any): ReduxAction {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload,
  };
}

function authLoginFailed(): ReduxAction {
  return {
    type: AUTH_LOGIN_FAILED,
  };
}

function qrCodeGenerate(): ReduxAction {
  return {
    type: QR_CODE_GENERATE,
  };
}

function authOTPCheck(): ReduxAction {
  return {
    type: AUTH_OTP_CHECK,
  };
}

function authOTPCheckSuccess(payload: any): ReduxAction {
  return {
    type: AUTH_OTP_CHECK_SUCCESS,
    payload,
  };
}

function authOTPCheckFailed(): ReduxAction {
  return {
    type: AUTH_OTP_CHECK_FAILED,
  };
}

function authLogout(): ReduxAction {
  return {
    type: AUTH_LOGOUT,
  };
}

function authRefreshToken(payload: any): ReduxAction {
  return {
    type: AUTH_REFRESH_TOKEN,
    payload,
  };
}

function authUser(payload: any): ReduxAction {
  return {
    type: AUTH_USER,
    payload,
  };
}

export default {
  authCheck,
  authLogin,
  authLoginSuccess,
  authLoginFailed,
  qrCodeGenerate,
  authOTPCheck,
  authOTPCheckSuccess,
  authOTPCheckFailed,
  authLogout,
  authRefreshToken,
  authUser,
};
