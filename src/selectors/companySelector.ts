import { createSelector } from "reselect";
import type { CombinedReducers, CompanyData } from "../types";

export const companySelector = (state: CombinedReducers): CompanyData => {
  return state.stocks.tickerInfo.companyInfo;
};

export const companyBadgeInfoSelector = createSelector(
  [companySelector],
  (companyInfo) => {
    return [companyInfo.exchange, companyInfo.sector, companyInfo.currency];
  }
);
