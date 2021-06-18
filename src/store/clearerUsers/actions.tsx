/* eslint-disable @typescript-eslint/no-explicit-any */

import apiRequestAction from "../../util/apiRequestAction";

import { GET_CLEARER_USERS } from "./action-types";

export const getClearerUsersAction = {
  request: () => apiRequestAction(GET_CLEARER_USERS.REQUEST),
  success: (response: any) =>
    apiRequestAction(GET_CLEARER_USERS.SUCCESS, { response }),
  failure: (error: any) =>
    apiRequestAction(GET_CLEARER_USERS.FAILURE, { error }),
};

export default {
  getClearerUsersAction,
};
