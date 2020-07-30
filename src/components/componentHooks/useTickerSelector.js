import React from "react";
import { tickerSelector } from "../../selectors/tickerSelector";
import { useSelector } from "react-redux";

export const useTickerSelector = () => {
  return useSelector(tickerSelector);
};
