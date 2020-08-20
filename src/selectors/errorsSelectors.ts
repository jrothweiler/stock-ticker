import { createSelector } from "reselect";
import type { ReduxState } from "../types/reduxTypes";

export const errorsSelector = (state: ReduxState) => state.errors;

export const searchErrorsSelector = createSelector(
  [errorsSelector],
  (errors) => errors.search
);
