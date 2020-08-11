import type { ReduxState, Indexes } from "../types/reduxTypes";

export const indexSelector = (state: ReduxState): Indexes => {
  return state.stocks.indexes;
};
