import { INITIAL_CHART_RANGE } from "../utils/constants";

const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case "newQuoteData": {
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
