import { formatErrorMessage } from './errorUtils';


// Helper functions for fetching financial data from the proxy server
// See server/index.js for server code.

// Generalized fetch function over any endpoint
export const proxyFetch = async (symbol, endpoint, queryParams) => {
  // unfortunately, fetch does not support a query object, so we need 
  // to build the query string ourselves.
  let queryString = queryParams ? '?' : '';
  for (let field in queryParams) {
    queryString += `${field}=${queryParams[field]}`;
  }

  return fetch(`/api/${endpoint}/${symbol}${queryString}`).then((data) => {
    if (data.ok) {
      return data.json();
    } else {
      throw Error(formatErrorMessage(symbol, data));
    }
  });
};

// Fetches real time information (price, volume, high, low, etc) for the symbol
export const quoteFetch = async (symbol) => {
  return proxyFetch(symbol, "quote");
};

// Fetches company information
export const companyFetch = (symbol) => {
  return proxyFetch(symbol, "company");
};

// Fetches symbol statistics (PE ratio, dividend yield, etc.), data points which are generally not real-time.
export const statsFetch = (symbol) => {
  return proxyFetch(symbol, "stats");
};

// Fetches news articles for the company, 5 for each call.
export const newsFetch = (symbol) => {
  return proxyFetch(symbol, "news");
};

// Fetches top peers for the selected stock
export const peersFetch = (symbol) => {
  return proxyFetch(symbol, "peers");
};

// Fetches search results for selected stock search
export const searchFetch = (symbol) => {
  return proxyFetch(symbol, "search");
};


// collect historical data over the given period, either "1D", "5D", "1M", "1Y", "5Y", or "MAX"
export const historyFetch = (symbol, period) => {
  return proxyFetch(symbol, `history`, { period });
};
