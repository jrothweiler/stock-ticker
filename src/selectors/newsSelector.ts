import type { CombinedReducers, NewsData } from "../types";

export const newsSelector = (state: CombinedReducers): NewsData[] | null => {
  return state.stocks.tickerInfo.newsInfo;
};
