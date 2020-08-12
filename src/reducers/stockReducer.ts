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

interface NewsData {
  datetime: number,
  headline: string,
  source: string,
  url: string
}

interface CompanyData {
  companyName: string,
  website: string,
  description: string,
  exchange: string,
  sector: string,
  currency: string
}

interface StatsData {
  dividendYield: number,
  earningsPerShare: number,
  peRatio: number
}

interface HistoryData {
  date: number,
  minute: number,
  price: number
}

interface PeersData {
  peers: string[]
}

interface TickerInfo {
  quoteInfo: QuoteData | null,
  newsInfo: NewsData | null,
  companyInfo: CompanyData | null,
  statInfo: StatsData | null,
  historyInfo: HistoryData | null,
  peersInfo: PeersData | null
}

interface State {
  ticker: string | null,
  chartRange: string,
  tickerInfo: TickerInfo,
  indexes: string[]
};

interface Payload {
  symbol: string,
  data: TickerInfo
}
interface Action {
  type: string,
  payload: Payload
}
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
