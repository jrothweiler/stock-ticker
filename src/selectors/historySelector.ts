import type { CombinedReducers, HistoryData, Period } from "../types";

export const historySelector = (state: CombinedReducers): HistoryData => {
  return state.stocks.tickerInfo.historyInfo;
};

export const chartRangeSelector = (state: CombinedReducers): string =>
  state.stocks.chartRange;
