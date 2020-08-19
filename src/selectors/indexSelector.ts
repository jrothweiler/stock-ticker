import type { CombinedReducers, IndexData } from "../types";

export const indexSelector = (state: CombinedReducers): IndexData => {
  return state.stocks.indexes;
};
