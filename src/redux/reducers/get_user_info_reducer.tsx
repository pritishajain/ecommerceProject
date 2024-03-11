import { IinfoDataType } from "../../interface/data_interface";
import { IuserInfo } from "../../interface/user_data_interface";
import { GET_USER_INFO, ADD_TO_WISH_LIST, REMOVE_FROM_WISH_LIST, ADD_TO_CART, REMOVE_FROM_CART, 
  REMOVE_AND_ADD_TO_WISHLIST, UPDATE_QUANTITY, EMPTY_CART, EMPTY_DATA } from "../action_constants";

export interface userAction {
  type: string;
  payload: IuserInfo;
  productData: IinfoDataType;
  id: number;
  logIn: boolean;
  updatedData:IinfoDataType[]
}

export interface userState {
  userData: IuserInfo;
  isLogIn: boolean;
}

const initialState: userState = {
  userData: {
    email: "",
    fullName: "",
    cart: [],
    wishList: [],
    orderHistory: [],
  },

  isLogIn: false,
};

const userDataReducer = (
  state: userState = initialState,
  action: userAction
) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userData: action.payload,
      };
    case ADD_TO_WISH_LIST:
      return {
        ...state,
        userData: {
          ...state.userData,
          wishList: [...state.userData.wishList, action.productData],
        },
      };
    case REMOVE_FROM_WISH_LIST:
      return {
        ...state,
        userData: {
          ...state.userData,
          wishList: [
            ...state.userData.wishList.filter(
              (element:IinfoDataType) => action.id !== element.id
            ),
          ],
        },
      };

    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: [...state.userData.cart, action.productData],
        },
      };
      case REMOVE_FROM_CART:
        return {
          ...state,
          userData: {
            ...state.userData,
            cart: [
              ...state.userData.cart.filter(
                (element:IinfoDataType) => action.id !== element.id
              ),
            ],
            
          },
        };
        case REMOVE_AND_ADD_TO_WISHLIST:
        return {
          ...state,
          userData: {
            ...state.userData,
            cart: [
              ...state.userData.cart.filter(
                (element:IinfoDataType) => action.productData.id !== element.id
              ),
            ],
            wishList: [...state.userData.wishList, action.productData],
          },
        };
    case EMPTY_DATA:
      return {
        ...state,
        userData: {
          email: "",
          fullName: "",
          cart: [],
          wishList: [],
          orderHistory: [],
        },
      };
      
      case UPDATE_QUANTITY:
        return {
          ...state,
          userData: {
            ...state.userData,
            cart: action.updatedData
          },
        };

        case EMPTY_CART:
          return {
            ...state,
            userData: {
              ...state.userData,
              orderHistory: state.userData.cart,
              cart:[]
            },
          };
    default: {
      return state;
    }
  }
};

export default userDataReducer;
