import type { ReduxState } from "../types/reduxTypes";

export const historySelector = (state: ReduxState) =>
  state.stocks.tickerInfo.historyInfo;

export const chartRangeSelector = (state: ReduxState) =>
  state.stocks.chartRange;
