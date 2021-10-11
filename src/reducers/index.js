import { combineReducers } from "redux";
import medications from "./medications";
import utilisateurs from "./edituser";
import payment from "./payment";
import auth from "./auth";
import state from "./auth";
import message from "./message";
import searchReducer from './searchReducer';


export default combineReducers({
  medications,
  utilisateurs,
  auth,
  state,
  message,
  payment,
  results: searchReducer,
});