const initialState = {
  ticker: "AAPL",
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
          tickerInfo: action.payload
      }
    }
    default:
      return state;
  }
}