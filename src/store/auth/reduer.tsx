/* eslint-disable @typescript-eslint/no-explicit-any */
// import HTTP from '../../../utils/Http';
// import Lockr from 'lockr';

import ReduxAction from '../redux-action';
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_ERRORS,
} from './action-types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  errors: []
};

function login(state: any, payload: any) {
  // eslint-disable-next-line no-console
  console.log('login', { state, payload })
  // localStorage.setItem('access_token', payload.token);
  // HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;

  return {
    ...state,
    isAuthenticated: true,
  }
}

function checkAuth(state: any) {
  const newState = {
    ...state,
    isAuthenticated: !!localStorage.getItem('access_token')
  }

  // if (state.isAuthenticated) {
  //   const bearer = `Bearer ${localStorage.getItem('access_token')}`
  //   HTTP.defaults.headers.common['Authorization'] = bearer;
  // }

  return newState;
}

function logout(state: any) {
  localStorage.removeItem('access_token')

  return {
    ...state, isAuthenticated: false
  }
}

function resetPassword(state: any) {
  return {
    ...state, resetPassword: true,
  }
}

const reducer = (
  state = initialState, 
  { type, payload = null } : ReduxAction
): typeof initialState => {
  switch(type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      // setIdentity(payload);
      return {
        ...login(state, payload),
        loading: false,
      };
    case AUTH_REFRESH_TOKEN:
      return login(state, payload);
    case AUTH_CHECK:
      return checkAuth(state);
    case AUTH_LOGOUT:
      return logout(state);
    case AUTH_RESET_PASSWORD:
      return resetPassword(state);
    case AUTH_ERRORS:
      return {
        ...state,
        errors: payload
      }
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAuth = (state: any): boolean => state.auth.isAuthenticated;

export default reducer;
