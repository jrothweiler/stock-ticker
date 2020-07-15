const initialState = {
  ticker: null,
  tickerInfo: {
    quoteInfo: null,
    newsInfo: null,
    companyInfo: null,
    statInfo: null,
  }

}

export default (state = initialState, action) => {
    
  switch (action.type) {
    case 'newQuoteData': {
        return {
            ...state, 
            tickerInfo: {
              ...state.tickerInfo,
              quoteInfo: action.payload
            }
        }
    }
    case 'newTickerData': {
      return {
          ...state, 
          ticker: action.payload.symbol,
          tickerInfo: action.payload.data
      }
    }
  }
}