import { INITIAL_CHART_RANGE } from "../utils/constants";
import type { StockState, StockAction } from "../types/reduxTypes";

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

export default (state = initialState, action: StockAction): StockState => {
  switch (action.type) {
    case "newQuoteData": {
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
    case "newTickerData": {
      return {
        ...state,
        ticker: action.payload.symbol,
        tickerInfo: {
          ...state.tickerInfo,
          ...action.payload.data,
        },
      };
    }
    case "newIndexData": {
      return {
        ...state,
        indexes: action.payload,
      };
    }
    case "newHistoryData": {
      return {
        ...state,
        tickerInfo: {
          ...state.tickerInfo,
          historyInfo: action.payload,
        },
      };
    }
    case "newChartRange": {
      return {
        ...state,
        chartRange: action.payload,
      };
    }
    default:
      return state;
  }
};
