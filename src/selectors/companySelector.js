import { createSelector } from "reselect";

export const companySelector = (state) => {
  return state.stocks.tickerInfo.companyInfo;
};

export const companyBadgeInfoSelector = createSelector(
  [companySelector],
  (companyInfo) => {
    return [companyInfo.exchange, companyInfo.sector, companyInfo.currency];
  }
);
