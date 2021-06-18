import User from "../../types/User";
import ReduxAction from "../redux-action";
import { GET_CLEARER_USERS } from "./action-types";

interface State {
  clearerUsers: User[];
  loading: boolean;
}
const initialState: State = {
  clearerUsers: [],
  loading: false,
};

const reducer = (
  state = initialState,
  { type, payload = null }: ReduxAction
): typeof initialState => {
  switch (type) {
    case GET_CLEARER_USERS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CLEARER_USERS.SUCCESS:
      console.log("REQUEST success ", payload);
      return {
        ...state,
        loading: false,
        clearerUsers: payload.response.content,
      };

    default:
      return state;
  }
};

export default reducer;
