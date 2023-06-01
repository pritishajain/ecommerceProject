import { ADD_CATEGORY, ADD_BRAND_CATEGORY, ADD_SUB_CATEGORY, REMOVE_BRAND_CATEGORY,
   REMOVE_SUB_CATEGORY, PRICE_FILTER} from "../action_constants";

export interface filterAction {
  type: string;
  payload: string;
  max:number;
  min:number;
}

export interface filterState {
  category: string;
  subCategory: string[];
  brand: string[];
  maxRange:number;
  minRange:number;
}

const initialState: filterState = {
  category: "All Products",
  subCategory: [],
  brand: [],
  maxRange: 10000,
  minRange: 100
};

const filterPropertyReducer = (
  state: filterState = initialState,
  action: filterAction
) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ADD_SUB_CATEGORY:
      return {
        ...state,
        subCategory: [...state.subCategory, action.payload],
      };
    case ADD_BRAND_CATEGORY:
      return {
        ...state,
        brand: [...state.brand, action.payload],
      };

    case REMOVE_SUB_CATEGORY:
      return {
        ...state,
        subCategory: [...state.subCategory].filter(
          (value:string) => value !== action.payload
        ),
      };
    case REMOVE_BRAND_CATEGORY:
      return {
        ...state,
        brand: [...state.brand].filter(
          (value:string) => value !== action.payload
        ),
      };
      case PRICE_FILTER:
        return{
            ...state,
            maxRange:action.max,
            minRange:action.min
        }
    default: {
      return state;
    }
  }
};

export default filterPropertyReducer;
