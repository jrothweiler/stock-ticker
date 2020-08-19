import type { CombinedReducers, NewsData } from "../types";

export const newsSelector = (state: CombinedReducers): NewsData => {
  return state.stocks.tickerInfo.newsInfo;
};
