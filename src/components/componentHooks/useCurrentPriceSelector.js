import React from "react";

import { useSelector } from "react-redux";
import { currentPriceSelector } from "../../selectors/quoteSelector";
export const useCurrentPriceSelector = () => {
  return useSelector(currentPriceSelector);
};
