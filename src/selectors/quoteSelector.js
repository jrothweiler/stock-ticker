import { createSelector } from 'reselect';

export const quoteSelector = (state) => {
    return state.stocks.tickerInfo.quoteInfo;
}

export const currentPriceSelector = createSelector([quoteSelector], (quoteData) => quoteData?.latestPrice)