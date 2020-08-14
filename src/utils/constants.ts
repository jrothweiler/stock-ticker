export const INITIAL_STOCK: string = "AAPL";
export const VALID_SEARCH_REGEXP: RegExp = /^[A-Za-z]+$/;
export const INITIAL_CHART_RANGE: string = "1D";
export const POSSIBLE_CHART_RANGES: string[] = [
  "1D",
  "5D",
  "1M",
  "1Y",
  "5Y",
  "MAX",
];

//Reducer actions

//Middleware
export const SEARCH_SYMBOL: string = "searchSymbol";
export const SEARCH_INDEXES: string = "searchIndexes";
export const FETCH_HISTORY: string = "fetchHistory";

//Stock Reducer
export const NEW_QUOTE_DATA: string = "newQuoteData";
export const NEW_TICKER_DATA: string = "newTickerData";
export const NEW_INDEX_DATA: string = "newIndexData";
export const NEW_HISTORY_DATA: string = "newHistoryData";
export const NEW_CHART_RANGE: string = "newChartRange";

//Error Reducer
export const SEARCH_ERROR: string = "searchError";
export const CLEAR_SEARCH_ERRORS: string = "clearSearchErrors";

//Socket Emits
export const NEW_INDEXES: string = "newIndexes";
export const NEW_SYMBOL: string = "newSymbol";
export const REAL_TIME_QUOTE_DATA: string = "realTimeQuoteData";
export const REAL_TIME_INDEX_DATA: string = "realTimeIndexData";
