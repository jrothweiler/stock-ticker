import type { ReduxState } from "../types/reduxTypes";

export const statsSelector = (state: ReduxState) => {
  return state.stocks.tickerInfo.statInfo;
};
