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
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
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

function authLoginError(payload: any): ReduxAction {
  return {
    type: AUTH_LOGIN_ERROR,
    payload,
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

function authResetPassword(): ReduxAction {
  return {
    type: AUTH_RESET_PASSWORD,
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
  authLoginError,
  authLogout,
  authRefreshToken,
  authResetPassword,
  authUser,
};
