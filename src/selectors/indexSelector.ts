import type { ReduxState } from "../types/reduxTypes";

export const indexSelector = (state: ReduxState) => {
  return state.stocks.indexes;
};
