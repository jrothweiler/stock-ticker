export const formatErrorMessage = (symbol: string, response: Response) => {
  switch (response.status) {
    case 404:
      return `Symbol ${symbol} does not exist`;
    default:
      return response.statusText;
  }
};
