import type { ReduxState } from "../types/reduxTypes";

export const newsSelector = (state: ReduxState) => {
  return state.stocks.tickerInfo.newsInfo;
};
