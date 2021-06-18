import {
  createSlice as createSliceOriginal,
  SliceCaseReducers,
  CreateSliceOptions,
} from "@reduxjs/toolkit";
import { RootStateKeyType } from "../types/injector-typings";

/* Wrap createSlice with stricter Name options */

/* istanbul ignore next */
// eslint-disable-next-line import/prefer-default-export
export const createSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  RootStateKeyType
>(
  options: CreateSliceOptions<State, CaseReducers, RootStateKeyType>
) => {
  return createSliceOriginal(options);
};
