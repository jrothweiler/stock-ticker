import type { Period } from "../utils/serverUtils";

interface QuoteData {
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
  isUSMarketOpen: number;
  latestUpdate: number;
}

export type QuoteInfo = QuoteData | null;

interface NewsArticle {
  datetime: number;
  headline: string;
  source: string;
  url: string;
}

export type NewsInfo = NewsArticle[] | null;

interface CompanyData {
  companyName: string;
  website: string;
  description: string;
  exchange: string;
  sector: string;
  currency: string;
}

export type CompanyInfo = CompanyData | null;

interface StatData {
  dividendYield: number;
  ttmEPS: number;
  peRatio: number;
}

export type StatInfo = StatData | null;

interface HistoryPoint {
  date: string;
  minute: string;
  price: number;
}

export type HistoryInfo = HistoryPoint[] | null;

export type PeersInfo = string[] | null;

interface Index {
  symbol: string;
  latestPrice: number;
  open: number;
}

export type Indexes = Index[] | null;

export interface StockState {
  ticker: string | null;
  chartRange: Period;
  tickerInfo: {
    quoteInfo: QuoteInfo;
    newsInfo: NewsInfo;
    companyInfo: CompanyInfo;
    statInfo: StatInfo;
    historyInfo: HistoryInfo;
    peersInfo: PeersInfo;
  };
  indexes: Indexes;
}

export interface ErrorState {
  search: string;
}

export interface ReduxState {
  stocks: StockState;
  errors: ErrorState;
}
