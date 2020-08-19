import type { CombinedReducers, StatsData } from "../types";

export const statsSelector = (state: CombinedReducers): StatsData | null => {
  return state.stocks.tickerInfo.statInfo;
};
