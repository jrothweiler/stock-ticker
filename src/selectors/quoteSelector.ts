import { createSelector } from "reselect";
import type { ReduxState, QuoteInfo } from "../types/reduxTypes";

export const quoteSelector = (state: ReduxState): QuoteInfo => {
  return state.stocks.tickerInfo.quoteInfo;
};

export const currentPriceSelector = createSelector(
  [quoteSelector],
  (quoteData) => quoteData?.latestPrice
);
