import { createSelector } from "reselect";
import type { ReduxState, ErrorState } from "../types/reduxTypes";

export const errorsSelector = (state: ReduxState): ErrorState => state.errors;

export const searchErrorsSelector = createSelector(
  [errorsSelector],
  (errors) => errors.search
);
