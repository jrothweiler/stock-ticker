import {
  INITIAL_CHART_RANGE,
  INITIAL_STOCK,
  SEARCH_SYMBOL,
  SEARCH_INDEXES,
  FETCH_HISTORY,
  NEW_QUOTE_DATA,
  NEW_TICKER_DATA,
  NEW_INDEX_DATA,
  NEW_HISTORY_DATA,
  NEW_CHART_RANGE,
  SEARCH_ERROR,
  CLEAR_SEARCH_ERRORS,
  NEW_INDEXES,
  NEW_SYMBOL,
  REAL_TIME_QUOTE_DATA,
  REAL_TIME_INDEX_DATA,
} from "../utils/constants";

import type { ErrorState, DispatchAction } from "../types";

const initialState: ErrorState = {
  search: null,
};

export default (state = initialState, action: DispatchAction) => {
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
