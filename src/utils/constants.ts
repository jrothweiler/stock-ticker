export const INITIAL_STOCK = "AAPL";
export const VALID_SEARCH_REGEXP = /^[A-Za-z]+$/;
export const INITIAL_CHART_RANGE = "1D";
export const POSSIBLE_CHART_RANGES = ["1D", "5D", "1M", "1Y", "5Y", "MAX"];

// action names
export const SEARCH_ERROR = "searchError";
export const CLEAR_SEARCH_ERRORS = "clearSearchErrors";

export const NEW_QUOTE_DATA = "newQuoteData";
export const NEW_TICKER_DATA = "newTickerData";
export const NEW_CHART_RANGE = "newChartRange";
export const NEW_HISTORY_DATA = "newHistoryData";
export const NEW_INDEX_DATA = "newIndexData";

export const SEARCH_INDEXES = "searchIndexes";
export const FETCH_HISTORY = "fetchHistory";
export const SEARCH_SYMBOL = "searchSymbol";

export const WEBSOCKET_URL = "http://localhost:3001";
