export const proxyFetch = (symbol, endpoint) => {
    return fetch(`/api/${endpoint}/${symbol}`).then(data => data.json());
}