import { createSelector } from "reselect";
import type { ReduxState } from "../types/reduxTypes";

export const quoteSelector = (state: ReduxState) => {
  return state.stocks.tickerInfo.quoteInfo;
};

export const currentPriceSelector = createSelector(
  [quoteSelector],
  (quoteData) => quoteData?.latestPrice
);
