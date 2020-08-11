import type { ReduxState, HistoryInfo } from "../types/reduxTypes";
import type { Period } from "../utils/serverUtils";

export const historySelector = (state: ReduxState): HistoryInfo =>
  state.stocks.tickerInfo.historyInfo;

export const chartRangeSelector = (state: ReduxState): Period =>
  state.stocks.chartRange;
