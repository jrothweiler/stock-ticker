import {
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
} from "./utils/constants";

type Period = "1D" | "5D" | "1M" | "1Y" | "5Y";

//Dispatch Types
type DispatchActionTypes =
  | typeof SEARCH_ERROR
  | typeof CLEAR_SEARCH_ERRORS
  | typeof NEW_QUOTE_DATA
  | typeof NEW_TICKER_DATA
  | typeof NEW_CHART_RANGE
  | typeof NEW_HISTORY_DATA
  | typeof NEW_INDEX_DATA
  | typeof SEARCH_INDEXES
  | typeof FETCH_HISTORY
  | typeof SEARCH_SYMBOL;

interface GenericDispatchAction<T extends DispatchActionTypes, P> {
  type: T;
  payload: P;
}

type DispatchAction =
  | GenericDispatchAction<typeof NEW_QUOTE_DATA, QuoteData>
  | GenericDispatchAction<
      typeof NEW_TICKER_DATA,
      { symbol: string; data: TickerInfo }
    >
  | GenericDispatchAction<typeof NEW_CHART_RANGE, Period>
  | GenericDispatchAction<typeof NEW_HISTORY_DATA, HistoryData>
  | GenericDispatchAction<typeof NEW_INDEX_DATA, IndexData>
  | GenericDispatchAction<typeof SEARCH_INDEXES, Array<string>>
  | GenericDispatchAction<
      typeof FETCH_HISTORY,
      { symbol: string; period: Period }
    >
  | GenericDispatchAction<typeof SEARCH_HISTORY, string>
  | GenericDispatchAction<typeof SEARCH_ERROR, string>
  | GenericDispatchAction<typeof CLEAR_SEARCH_ERRORS, undefinded>;

//Reducer cases
type QuoteData = {
  symbol: string;
  previousClose: number;
  week52High: number;
  week52Low: number;
  high: number;
  low: number;
  latestPrice: number;
  marketCap: number;
  latestVolume: number;
  open: number;
  avgTotalVolume: number;
  isUsMarketOpen: number;
  latestUpdate: boolean;
};

type NewsData = {
  datetime: number;
  headline: string;
  source: string;
  url: string;
};

type CompanyData = {
  companyName: string;
  website: string;
  description: string;
  exchange: string;
  sector: string;
  currency: string;
};

type StatsData = {
  dividendYield: number;
  earningsPerShare: number;
  peRatio: number;
};

type HistoryData = {
  date: number;
  minute: number;
  price: number;
};

type PeersData = {
  peers: Array<string>;
};

//Reducer dispatch types

type TickerInfo = {
  quoteInfo: QuoteData | null;
  newsInfo: NewsData | null;
  companyInfo: CompanyData | null;
  statInfo: StatsData | null;
  historyInfo: HistoryData | null;
  peersInfo: PeersData | null;
};

export interface StockState {
  ticker: string | null;
  chartRange: string;
  tickerInfo: TickerInfo;
  indexes: Array<string>;
}

interface ErrorState {
  search: String | null;
}

interface Payload {
  symbol: string;
  data: TickerInfo;
}

interface Action {
  type: string;
  payload: Payload;
}

interface ErrorState {
  search: String | null;
}
