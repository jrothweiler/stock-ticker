import type { ReduxState, StatInfo } from "../types/reduxTypes";

export const statsSelector = (state: ReduxState): StatInfo => {
  return state.stocks.tickerInfo.statInfo;
};
