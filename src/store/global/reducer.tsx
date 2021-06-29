import ReduxAction from "../redux-action";
import { CLEAR_ERROR, SET_ERROR, SET_THEME } from "./action-types";

export const initialState = {
  theme: "dark",
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
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};

export default reducer;
