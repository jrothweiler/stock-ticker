import { createSelector } from "reselect";
import type { CombinedReducers, QuoteData } from "../types";

export const quoteSelector = (state: CombinedReducers): QuoteData => {
  return state.stocks.tickerInfo.quoteInfo;
};

export const currentPriceSelector = createSelector(
  [quoteSelector],
  (quoteData) => quoteData?.latestPrice
);
