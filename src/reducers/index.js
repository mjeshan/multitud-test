import { combineReducers } from "redux";

import app from "./appReducer";
import fbCreds from "./fbReducer";

export default combineReducers({
  app,
  fbCreds,
});
