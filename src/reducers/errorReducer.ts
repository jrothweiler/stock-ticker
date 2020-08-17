import type { Reducer } from "redux";
import type { ErrorState, StockAction } from "../types";

import { SEARCH_ERROR, CLEAR_SEARCH_ERRORS } from "../utils/constants";

const initialState: ErrorState = {
  search: null,
};

export const ErrorReducer: Reducer<ErrorState, StockAction> = (
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
