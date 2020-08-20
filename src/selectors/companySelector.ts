import { createSelector } from "reselect";
import type { ReduxState } from "../types/reduxTypes";

export const companySelector = (state: ReduxState) => {
  return state.stocks.tickerInfo.companyInfo;
};

export const companyBadgeInfoSelector = createSelector(
  [companySelector],
  (companyInfo) => {
    return companyInfo
      ? [companyInfo.exchange, companyInfo.sector, companyInfo.currency]
      : [];
  }
);
