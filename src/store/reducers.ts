import { combineReducers } from "redux";

import auth from "./auth/reduer";
import global from "./global/reducer";

export default combineReducers({
  auth,
  global,
});
