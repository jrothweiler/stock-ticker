import {
  INITIAL_STOCK,
  SEARCH_SYMBOL,
  SEARCH_INDEXES,
  FETCH_HISTORY,
  NEW_QUOTE_DATA,
  NEW_TICKER_DATA,
  NEW_INDEX_DATA,
  NEW_HISTORY_DATA,
  SEARCH_ERROR,
  CLEAR_SEARCH_ERRORS,
  NEW_CHART_RANGE,
  NEW_INDEXES,
  NEW_SYMBOL,
  REAL_TIME_QUOTE_DATA,
  REAL_TIME_INDEX_DATA,
  WEBSOCKET_URL,
} from "./utils/constants";
import type { Action } from "redux";

export interface QuoteData {
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
  isUSMarketOpen: boolean;
  latestUpdate: number;
}

interface NewsData {
  datetime: number;
  headline: string;
  source: string;
  url: string;
}

interface CompanyData {
  companyName: string;
  website: string;
  description: string;
  exchange: string;
  sector: string;
  currency: string;
}

interface StatsData {
  dividendYield: number;
  earningsPerShare: number;
  peRatio: number;
}

interface HistoryData {
  date: number;
  minute: number;
  price: number;
}

interface PeersData {
  peers: Array<string>;
}

interface TickerInfo {
  quoteInfo: QuoteData | null;
  newsInfo: NewsData | null;
  companyInfo: CompanyData | null;
  statInfo: StatsData | null;
  historyInfo: HistoryData | null;
  peersInfo: PeersData | null;
}

interface StockState {
  ticker: string | null;
  chartRange: string;
  tickerInfo: TickerInfo;
  indexes: QuoteData[];
}

export interface ErrorState {
  search: string | null;
}

type ActionTypes =
  | typeof NEW_QUOTE_DATA
  | typeof NEW_TICKER_DATA
  | typeof NEW_CHART_RANGE
  | typeof NEW_HISTORY_DATA
  | typeof NEW_INDEX_DATA
  | typeof SEARCH_INDEXES
  | typeof FETCH_HISTORY
  | typeof SEARCH_SYMBOL
  | typeof SEARCH_ERROR
  | typeof CLEAR_SEARCH_ERRORS;

export interface PossibleAction<Type extends ActionTypes, Payload>
  extends Action<Type> {
  payload: Payload;
}

export type StockAction =
  | PossibleAction<typeof NEW_QUOTE_DATA, QuoteData>
  | PossibleAction<typeof NEW_TICKER_DATA, { symbol: string; data: TickerInfo }>
  | PossibleAction<typeof NEW_CHART_RANGE, Period>
  | PossibleAction<typeof NEW_HISTORY_DATA, HistoryData>
  | PossibleAction<typeof NEW_INDEX_DATA, QuoteData[]>
  | PossibleAction<typeof SEARCH_INDEXES, string[]>
  | PossibleAction<typeof FETCH_HISTORY, { symbol: string; period: Period }>
  | PossibleAction<typeof SEARCH_SYMBOL, string>
  | PossibleAction<typeof SEARCH_ERROR, string>
  | PossibleAction<typeof CLEAR_SEARCH_ERRORS, undefined>;

interface StockReducer<StockState, A extends StockAction> {
  (state: StockState, action: A): StockState;
}

type Period = "1D" | "5D" | "1M" | "1Y" | "5Y";

export interface CombinedReducers<S extends StockState, E extends ErrorState> {
  stocks: S;
  errors: E;
}