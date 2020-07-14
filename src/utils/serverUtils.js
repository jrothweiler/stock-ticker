// Helper functions for fetching financial data from the proxy server
// See server/index.js for server code.

// Generalized fetch function over any endpoint
export const proxyFetch = (symbol, endpoint) => {
    return fetch(`/api/${endpoint}/${symbol}`).then(data => data.json());
}

// Fetches real time information (price, volume, high, low, etc) for the symbol
export const quoteFetch = (symbol) => {
    return fetch(`/api/quote/${symbol}`).then(data => data.json());
}

// Fetches company information 
export const companyFetch = (symbol) => {
    return fetch(`/api/company/${symbol}`).then(data => data.json());
}

// Fetches symbol statistics (PE ratio, dividend yield, etc.), data points which are generally not real-time.
export const statsFetch = (symbol) => {
    return fetch(`/api/stats/${symbol}`).then(data => data.json());
}

// Fetches news articles for the company, 5 for each call.
export const newsFetch = (symbol) => {
    return fetch(`/api/quote/${symbol}`).then(data => data.json());
}