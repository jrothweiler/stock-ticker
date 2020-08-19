import type { CombinedReducers, HistoryData, Period } from "../types";

export const historySelector = (
  state: CombinedReducers
): HistoryData[] | null => {
  return state.stocks.tickerInfo.historyInfo;
};

export const chartRangeSelector = (state: CombinedReducers): Period =>
  state.stocks.chartRange;
