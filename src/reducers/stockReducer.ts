import type { Reducer } from "redux";
import type { StockState, StockAction } from "../types";
import {
  INITIAL_CHART_RANGE,
  NEW_QUOTE_DATA,
  NEW_TICKER_DATA,
  NEW_INDEX_DATA,
  NEW_HISTORY_DATA,
  NEW_CHART_RANGE,
} from "../utils/constants";

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

export const StockReducer: Reducer<StockState, StockAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case NEW_QUOTE_DATA: {
      // if the symbol fetched for does not match the current symbol,
      // this action might be leftover from the previous symbol, so disregard it
      if (state.ticker !== action.payload.symbol) {
        return state;
      }
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
