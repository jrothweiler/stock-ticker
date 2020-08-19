import type { CombinedReducers } from "../types";

export const tickerSelector = (state: CombinedReducers): string | null => {
  return state.stocks.ticker;
};
