const initialSate = {
    ticker = "AAPL",
    tickerInfo = {} //Dependent on Ticker
}

export default (state = initialState, action) => {
    
    switch (action.type) {
      case 'search': { //User searches a new stock
          return {
              ...state,
              ticker: newTicker
          }
      }
      //Might need to go in middleware since it requires a payload v
      case 'changeInterval': { //User selects a a different timescale for display (1 day, 5 day, 1 month, etc)
        return {
            ...state
        }
      }
    }
  }