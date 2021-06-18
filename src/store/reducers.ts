import { combineReducers } from "redux";

import auth from "./auth/reduer";
import global from "./global/reducer";
import clearerUsers from "./clearerUsers/reducer";

export default combineReducers({
  auth,
  global,
  clearerUsers,
});
