import {createSelector} from 'reselect';

export const errorsSelector = (state) => state.errors;

export const searchErrorsSelector = createSelector([errorsSelector], (errors) => errors.search);