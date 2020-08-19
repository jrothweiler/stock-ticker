import { createSelector } from "reselect";
import type { CombinedReducers, ErrorState } from "../types";

export const errorsSelector = (state: CombinedReducers): ErrorState =>
  state.errors;

export const searchErrorsSelector = createSelector(
  [errorsSelector],
  (errors) => errors.search
);
