// Helper functions for fetching financial data from the proxy server
// See server/index.js for server code.


// Generalized fetch function over any endpoint
export const proxyFetch = async (symbol, endpoint) => {
    return fetch(`/api/${endpoint}/${symbol}`)
        .then(data => {
            if (data.ok) {
                return data.json();
            } else {
                throw Error(data.statusText)
            }
        })
        
}

// Fetches real time information (price, volume, high, low, etc) for the symbol
export const quoteFetch = async (symbol) => {
    return proxyFetch(symbol, "quote");
}

// Fetches company information 
export const companyFetch = (symbol) => {
    return proxyFetch(symbol, "company");
}

// Fetches symbol statistics (PE ratio, dividend yield, etc.), data points which are generally not real-time.
export const statsFetch = (symbol) => {
    return proxyFetch(symbol, "stats");
}

// Fetches news articles for the company, 5 for each call.
export const newsFetch = (symbol) => {
    return proxyFetch(symbol, "news");
}

export const historyFetch = (symbol) => {
    return proxyFetch(symbol, 'history');
}