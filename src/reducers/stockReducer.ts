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

import type { StockState, DispatchAction } from "../types";

const initialState: StockState = {
  ticker: null,
  chartRange: INITIAL_CHART_RANGE,
  tickerInfo: {
    quoteInfo: null,
    newsInfo: null,
    companyInfo: null,
    statInfo: null,
    historyInfo: null,
    peersInfo: null,
  },
  indexes: [],
};

export default (state: StockState = initialState, action: DispatchAction) => {
  switch (action.type) {
    case NEW_QUOTE_DATA: {
      return {
        ...state,
        tickerInfo: {
          ...state.tickerInfo,
          quoteInfo: action.payload,
        },
      };
    }
    case NEW_TICKER_DATA: {
      return {
        ...state,
        ticker: action.payload.symbol,
        tickerInfo: {
          ...state.tickerInfo,
          ...action.payload.data,
        },
      };
    }
    case NEW_INDEX_DATA: {
      return {
        ...state,
        indexes: action.payload,
      };
    }
    case NEW_HISTORY_DATA: {
      return {
        ...state,
        tickerInfo: {
          ...state.tickerInfo,
          historyInfo: action.payload,
        },
      };
    }
    case NEW_CHART_RANGE: {
      return {
        ...state,
        chartRange: action.payload,
      };
    }
    default:
      return state;
  }
};
