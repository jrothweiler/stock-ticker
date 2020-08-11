import type { ReduxState, PeersInfo } from "../types/reduxTypes";

export const peersSelector = (state: ReduxState): PeersInfo => {
  return state.stocks.tickerInfo.peersInfo;
};
