import { formatErrorMessage } from "./errorUtils";

// Helper functions for fetching financial data from the proxy server
// See server/index.js for server code.
const indexes = [
  { symbol: "MSFT", latestPrice: 200, open: 250 },
  { symbol: "AMZN", latestPrice: 3000, open: 2900 },
  { symbol: "GOOGL", latestPrice: 1500, open: 1450 },
];
// Generalized fetch function over any endpoint
export const proxyFetch = async (
  symbol: string,
  endpoint: string,
  queryParams?: any,
  options?: any
) => {
  // unfortunately, fetch does not support a query object, so we need
  // to build the query string ourselves.
  let queryString = queryParams ? "?" : "";
  const fetchOptions = options || {};
  for (let field in queryParams) {
    queryString += `${field}=${queryParams[field]}`;
  }

  return fetch(`/api/${endpoint}/${symbol}${queryString}`, fetchOptions).then(
    (data) => {
      if (data.ok) {
        return data.json();
      } else {
        throw Error(formatErrorMessage(symbol, data));
      }
    }
  );
};

// Fetches real time information (price, volume, high, low, etc) for the symbol
export const quoteFetch = async (symbol: string) => {
  return proxyFetch(symbol, "quote");
};

// Fetches company information
export const companyFetch = (symbol: string) => {
  return proxyFetch(symbol, "company");
};

// Fetches symbol statistics (PE ratio, dividend yield, etc.), data points which are generally not real-time.
export const statsFetch = (symbol: string) => {
  return proxyFetch(symbol, "stats");
};

// Fetches news articles for the company, 5 for each call.
export const newsFetch = (symbol: string) => {
  return proxyFetch(symbol, "news");
};

// Fetches top peers for the selected stock
export const peersFetch = (symbol: string) => {
  return proxyFetch(symbol, "peers");
};

// collect historical data over the given period, either "1D", "5D", "1M", "1Y", "5Y", or "MAX"
export const historyFetch = (symbol: string, period: string) => {
  return proxyFetch(symbol, `history`, { period });
};

let searchController: AbortController | null = null;
export const searchFetch = (searchText: string) => {
  if (searchController) {
    searchController.abort();
  }
  searchController = new AbortController();
  return proxyFetch(searchText, "search", "", {
    signal: searchController.signal,
  }).catch((e) => null);
};
