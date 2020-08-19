import type { CombinedReducers, PeersData } from "../types";

export const peersSelector = (state: CombinedReducers): PeersData => {
  return state.stocks.tickerInfo.peersInfo;
};
