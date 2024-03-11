import { combineReducers } from "redux";
import productReducer from "./fetch_reducer";
import filterPropertyReducer from "./filter_property_reducer";
import userDataReducer from "./get_user_info_reducer";
import authReducer from "./auth_reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  productReducer: productReducer,
  filterPropertyReducer: filterPropertyReducer,
  userDataReducer: userDataReducer,
});

export default rootReducer;
