import type { ReduxState, NewsInfo } from "../types/reduxTypes";

export const newsSelector = (state: ReduxState): NewsInfo => {
  return state.stocks.tickerInfo.newsInfo;
};
