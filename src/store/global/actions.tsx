import ReduxAction from "../redux-action";

import { CLEAR_ERROR, SET_ERROR, SET_THEME } from "./action-types";

interface ErrorResponseType {
  errorType: string;
  message: string;
}

function clearError(): ReduxAction {
  return {
    type: CLEAR_ERROR,
  };
}

function setError(payload: ErrorResponseType): ReduxAction {
  return {
    type: SET_ERROR,
    payload,
  };
}

function setTheme(payload: string): ReduxAction {
  return {
    type: SET_THEME,
    payload,
  };
}

export default {
  clearError,
  setError,
  setTheme,
};
