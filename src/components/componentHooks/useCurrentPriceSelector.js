import React from "react";
import { quoteSelector } from "../../selectors/quoteSelector";
import { createSelector } from "reselect";

export const useCurrentPriceSelector = createSelector(
  [quoteSelector],
  (quoteData) => quoteData?.latestPrice
);
