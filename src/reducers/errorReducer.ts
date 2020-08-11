import { SEARCH_ERROR, CLEAR_SEARCH_ERRORS } from "../utils/constants";
import type { ErrorState, StockAction } from "../types/reduxTypes";

const initialState: ErrorState = {
  search: null,
};

export default (state = initialState, action: StockAction): ErrorState => {
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
