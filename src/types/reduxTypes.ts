import type { Period } from "../utils/serverUtils";
import {
  SEARCH_ERROR,
  CLEAR_SEARCH_ERRORS,
  NEW_QUOTE_DATA,
  NEW_TICKER_DATA,
  NEW_CHART_RANGE,
  NEW_HISTORY_DATA,
  NEW_INDEX_DATA,
  SEARCH_INDEXES,
  FETCH_HISTORY,
  SEARCH_SYMBOL,
} from "../utils/constants";
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

export type QuoteInfo = QuoteData | null;

interface NewsArticle {
  datetime: number;
  headline: string;
  source: string;
  url: string;
}

export type NewsData = NewsArticle[];

export type NewsInfo = NewsData | null;

export interface CompanyData {
  companyName: string;
  website: string;
  description: string;
  exchange: string;
  sector: string;
  currency: string;
}

export type CompanyInfo = CompanyData | null;

export interface StatData {
  dividendYield: number;
  earningsPerShare: number;
  peRatio: number;
}

export type StatInfo = StatData | null;

interface HistoryPoint {
  date: string;
  minute: string;
  price: number;
}

export type HistoryData = HistoryPoint[];

export type HistoryInfo = HistoryData | null;

export type PeersData = string[];

export type PeersInfo = PeersData | null;

interface Index {
  symbol: string;
  latestPrice: number;
  open: number;
}

type IndexData = Index[];

export type Indexes = IndexData | null;

interface TickerInfo {
  quoteInfo: QuoteInfo;
  newsInfo: NewsInfo;
  companyInfo: CompanyInfo;
  statInfo: StatInfo;
  historyInfo: HistoryInfo;
  peersInfo: PeersInfo;
}

export interface StockState {
  ticker: string | null;
  chartRange: Period;
  tickerInfo: TickerInfo;
  indexes: Indexes;
}

export interface ErrorState {
  search: string | null;
}

export interface ReduxState {
  stocks: StockState;
  errors: ErrorState;
}

export interface SearchSuggestion {
  exchange: string;
  region: string;
  securityName: string;
  securityType: string;
  symbol: string;
}

export type SuggestionData = SearchSuggestion[];

type ActionTypes =
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

export interface GenericAction<T extends ActionTypes, P> extends Action<T> {
  payload: P;
}

export type StockAction =
  | GenericAction<typeof SEARCH_ERROR, string>
  | GenericAction<typeof CLEAR_SEARCH_ERRORS, undefined>
  | GenericAction<typeof NEW_QUOTE_DATA, QuoteData>
  | GenericAction<typeof NEW_TICKER_DATA, { symbol: string; data: TickerInfo }>
  | GenericAction<typeof NEW_CHART_RANGE, Period>
  | GenericAction<typeof NEW_HISTORY_DATA, HistoryData>
  | GenericAction<typeof NEW_INDEX_DATA, IndexData>
  | GenericAction<typeof SEARCH_INDEXES, string[]>
  | GenericAction<typeof FETCH_HISTORY, { symbol: string; period: Period }>
  | GenericAction<typeof SEARCH_SYMBOL, string>;
