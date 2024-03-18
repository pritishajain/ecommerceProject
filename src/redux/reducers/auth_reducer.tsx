import { Iauthuser } from "../../interface/user_data_interface";
import { IS_LOGGED_IN, REMOVE_AUTH_DATA } from "../action_constants";

export interface authAction {
    type: string;
    payload: Iauthuser;
}

export interface authState {
    authData: Iauthuser
}

const initialState = {
    authData: {
        token: "",
        user: {
            name: "",
            email: ""
        },
        isAdmin: false
    }

}

const authReducer = (
    state: authState = initialState,
    action: authAction
) => {
    switch (action.type) {

        case IS_LOGGED_IN:
            return {
                ...state,
                authData: action.payload
            }
        case REMOVE_AUTH_DATA:
            return {
                ...state,
                authData: {
                    token: "",
                    user: {
                        name: "",
                        email: ""
                    },
                    isAdmin: false
                }
            }
        default: {
            return state;
        }
    }
};

export default authReducer;