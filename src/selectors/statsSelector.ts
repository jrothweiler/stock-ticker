import type { CombinedReducers, StatsData } from "../types";

export const statsSelector = (state: CombinedReducers): StatsData => {
  return state.stocks.tickerInfo.statInfo;
};
