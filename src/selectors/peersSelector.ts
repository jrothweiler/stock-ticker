import type { CombinedReducers, PeersData } from "../types";

export const peersSelector = (state: CombinedReducers): PeersData | null => {
  return state.stocks.tickerInfo.peersInfo;
};
