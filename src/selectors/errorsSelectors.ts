import { createSelector } from "reselect";
import type { CombinedReducers, ErrorState } from "../types";

export const errorsSelector = (state: CombinedReducers): ErrorState | null =>
  state.errors;

export const searchErrorsSelector = createSelector(
  [errorsSelector],
  (errors) => errors?.search
);
