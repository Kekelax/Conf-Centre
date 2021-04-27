import { combineReducers } from "redux";
import eventReducer from "./eventreducer";
import errorReducer from "./errorreducer";
import authReducer from "./authreducer";
import userReducer from "./userreducer";

export default combineReducers({
  event: eventReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
});
