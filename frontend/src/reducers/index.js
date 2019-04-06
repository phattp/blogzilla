import { combineReducers } from "redux";
import blogs from "./blogs";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  blogs,
  errors,
  messages,
  auth
});
