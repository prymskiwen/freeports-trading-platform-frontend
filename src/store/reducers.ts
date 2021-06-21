import { combineReducers } from "@reduxjs/toolkit";
import { InjectedReducersType } from "../util/types/injector-typings";

/**
 * Merges the main reducer with the router
 * state and dynamically injected reducers
 */
// eslint-disable-next-line
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers,
  // so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state;
  }
  return combineReducers({
    ...injectedReducers,
  });
}
