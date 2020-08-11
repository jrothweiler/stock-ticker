import type { Period } from "../utils/serverUtils";

interface QuoteInfo {
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
  isUSMarketOpen: Number;
  latestUpdate: number;
}

interface NewsArticle {
  datetime: number;
  headline: string;
  source: string;
  url: string;
}

type NewsInfo = NewsArticle[];

interface CompanyInfo {
  companyName: string;
  website: string;
  description: string;
  exchange: string;
  sector: string;
  currency: string;
}

interface StatInfo {
  dividendYield: number;
  ttmEPS: number;
  peRatio: number;
}

interface HistoryPoint {
  date: string;
  minute: string;
  price: number;
}

type HistoryInfo = HistoryPoint[];

type PeersInfo = string[];

interface Index {
  symbol: string;
  latestPrice: number;
  open: number;
}

export interface StockState {
  ticker: string | null;
  chartRange: Period;
  tickerInfo: {
    quoteInfo: QuoteInfo | null;
    newsInfo: NewsInfo | null;
    companyInfo: CompanyInfo | null;
    statInfo: StatInfo | null;
    historyInfo: HistoryInfo | null;
    peersInfo: PeersInfo | null;
  };
  indexes: Index[] | null;
}
