import { IinfoDataType } from "../../interface/data_interface";
import { Iauthuser, IuserInfo } from "../../interface/user_data_interface";
import {
  FETCH_PRODUCTS, FETCH_DATA_SUCCESS, SERACH_FILTER, ADD_CATEGORY, ADD_SUB_CATEGORY,
  ADD_BRAND_CATEGORY, REMOVE_CATEGORY, REMOVE_SUB_CATEGORY, REMOVE_BRAND_CATEGORY, REMOVE_FILTER_PROPERTY,
  STORE_FILTERED_PRODUCTS, PRICE_FILTER_PRODUCTS, PRICE_FILTER, GET_USER_INFO, ADD_TO_CART, ADD_TO_WISH_LIST,
  REMOVE_FROM_CART, REMOVE_FROM_WISH_LIST, REMOVE_AND_ADD_TO_WISHLIST, IS_LOGGED_IN, EMPTY_CART, EMPTY_DATA,
  UPDATE_QUANTITY
} from "../action_constants";

export const fetchSomeData = () => {
  return {
    type: FETCH_PRODUCTS,
  };
};

export const fetchDataSuccess = (data: IinfoDataType[]) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const searchFilter = (data: IinfoDataType[], isSearching: boolean) => {
  return {
    type: SERACH_FILTER,
    payload: data,
    isSearched: isSearching

  }
}

export const addCategory = (filterName: string) => {
  return {
    type: ADD_CATEGORY,
    payload: filterName,
  }
}

export const addSubCategory = (filterName: string) => {
  return {
    type: ADD_SUB_CATEGORY,
    payload: filterName,
  }
}

export const addBrandCategory = (filterName: string) => {
  return {
    type: ADD_BRAND_CATEGORY,
    payload: filterName,
  }
}

export const removeCategory = (filterName: string) => {
  return {
    type: REMOVE_CATEGORY,
    payload: filterName,
  }
}

export const removeSubCategory = (filterName: string) => {
  return {
    type: REMOVE_SUB_CATEGORY,
    payload: filterName,
  }
}

export const removeBrandCategory = (filterName: string) => {
  return {
    type: REMOVE_BRAND_CATEGORY,
    payload: filterName,
  }
}

export const removeFilterProperty = (filterName: string) => {
  return {
    type: REMOVE_FILTER_PROPERTY,
    payload: filterName,
  }
}

export const storeFilteredProducts = (filteredList: IinfoDataType[]) => {
  return {
    type: STORE_FILTERED_PRODUCTS,
    payload: filteredList,
  }
}

export const priceFilter = (min: number, max: number) => {
  return {
    type: PRICE_FILTER,
    min: min,
    max: max
  }
}

export const priceFilterProducts = (priceData: IinfoDataType[]) => {
  return {
    type: PRICE_FILTER_PRODUCTS,
    payload: priceData
  }
}

export const getUserInfo = (userData: IuserInfo) => {
  return {
    type: GET_USER_INFO,
    payload: userData
  }
}

export const addToWishList = (productData: IinfoDataType) => {
  return {
    type: ADD_TO_WISH_LIST,
    productData: productData
  }
}

export const removeFromWishList = (id: number) => {
  return {
    type: REMOVE_FROM_WISH_LIST,
    id: id
  }
}

export const addToCart = (productData: IinfoDataType) => {
  return {
    type: ADD_TO_CART,
    productData: productData
  }
}

export const removeFromCart = (id: number) => {
  return {
    type: REMOVE_FROM_CART,
    id: id
  }
}

export const removeAddToWishList = (data: IinfoDataType) => {
  return {
    type: REMOVE_AND_ADD_TO_WISHLIST,
    productData: data
  }
}

export const isLoggedIn = (authData: Iauthuser) => {
  return {
    type: IS_LOGGED_IN,
    payload: authData
  }
}

export const removeAuthData = () => {
  return {
    type: "REMOVE_AUTH_DATA",
  }
}

export const emptyData = () => {
  return {
    type: EMPTY_DATA
  }
}

export const updateQuantity = (updatedCart: IinfoDataType[]) => {
  return {
    type: UPDATE_QUANTITY,
    updatedData: updatedCart
  }
}

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  }
}
