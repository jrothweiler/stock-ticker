export const historySelector = (state) => {
  return state.stocks.tickerInfo.historyInfo;
};

export const chartRangeSelector = (state) => state.stocks.chartRange;
