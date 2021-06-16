import ReduxAction from "../redux-action";
import { CLEAR_ERROR, SET_ERROR } from "./action-types";

const initialState = {
  error: { errorType: "", message: "" },
};

const reducer = (
  state = initialState,
  { type, payload = null }: ReduxAction
): typeof initialState => {
  switch (type) {
    case CLEAR_ERROR:
      return {
        ...state,
        error: { errorType: "", message: "" },
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
