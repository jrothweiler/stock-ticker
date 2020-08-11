import type { ReduxState } from "../types/reduxTypes";

export const tickerSelector = (state: ReduxState): string | null => {
  return state.stocks.ticker;
};
