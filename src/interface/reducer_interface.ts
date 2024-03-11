import { authState } from "../redux/reducers/auth_reducer";
import { myState } from "../redux/reducers/fetch_reducer";
import { userState } from "../redux/reducers/get_user_info_reducer";

export interface Istate {
  productReducer: myState;
}

export interface IuserState {
  userDataReducer: userState;
}

export interface IauthState {
  authReducer: authState;
}