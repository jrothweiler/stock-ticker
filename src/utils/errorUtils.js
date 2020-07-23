export const formatErrorMessage = (symbol, response) => {
    switch (response.status) {
        case 404:
            return `Symbol ${symbol} does not exist`
        default:
            return response.statusText
    }
}