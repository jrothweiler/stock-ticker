import type { ReduxState } from "../types/reduxTypes";

export const peersSelector = (state: ReduxState) => {
  return state.stocks.tickerInfo.peersInfo;
};
