import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import clientReducer from "./client/clientReducer";
import tagsReducer from "./tag/tagReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  clients: clientReducer,
  tags: tagsReducer, // Add this line

  // other reducers can go here
});

export default rootReducer;
