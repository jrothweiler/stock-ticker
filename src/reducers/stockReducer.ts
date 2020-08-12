import { INITIAL_CHART_RANGE } from "../utils/constants";

interface QuoteData {
  symbol: string,
  previousClose: number,
  week52High: number,
  week52Low: number,
  high: number,
  low: number,
  latestPrice: number,
  marketCap: number, 
  latestVolume: number,
  open: number,
  avgTotalVolume: number,
  isUsMarketOpen: number,
  latestUpdate: boolean
}

interface QuoteData {
  symbol: string,
  previousClose: number,
  week52High: number,
  week52Low: number,
  high: number,
  low: number,
  latestPrice: number,
  marketCap: number, 
  latestVolume: number,
  open: number,
  avgTotalVolume: number,
  isUsMarketOpen: number,
  latestUpdate: boolean
}

interface newsData {
  datetime: number,
  headline: string,
  source: string,
  url: string
}

interface State {
  ticker: string | null,
  chartRange: string,
  tickerInfo: {
    quoteInfo: QuoteData | null,
    newsInfo: object | null,
    companyInfo: object | null,
    statInfo: object | null,
    historyInfo: object | null,
    peersInfo: object | null
  },
  indexes: string[]
};

const initialState: State = {
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

interface Action {
  type: string,
  payload: object
}
export default (state: State = initialState, action: Action) => {
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
