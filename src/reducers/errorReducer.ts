import { SEARCH_ERROR, CLEAR_SEARCH_ERRORS } from "../utils/constants";
import type { ErrorState, StockAction } from "../types/reduxTypes";
import type { Reducer } from "redux";

const initialState: ErrorState = {
  search: null,
};

const errorReducer: Reducer<ErrorState, StockAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SEARCH_ERROR:
      return {
        ...state,
        search: action.payload,
      };
    case CLEAR_SEARCH_ERRORS:
      return {
        ...state,
        search: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
