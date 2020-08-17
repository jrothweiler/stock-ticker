import React, { useEffect } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import stockReducer from "./reducers/stockReducer";
import errorReducer from "./reducers/errorReducer";
import {
  quoteFetch,
  companyFetch,
  newsFetch,
  statsFetch,
  historyFetch,
  peersFetch,
} from "./utils/serverUtils";
import {
  INITIAL_STOCK,
  SEARCH_SYMBOL,
  SEARCH_INDEXES,
  FETCH_HISTORY,
  NEW_QUOTE_DATA,
  NEW_TICKER_DATA,
  NEW_INDEX_DATA,
  NEW_HISTORY_DATA,
  SEARCH_ERROR,
  NEW_INDEXES,
  NEW_SYMBOL,
  REAL_TIME_QUOTE_DATA,
  REAL_TIME_INDEX_DATA,
  WEBSOCKET_URL,
} from "./utils/constants";
import socketIOClient from "socket.io-client";
import { StockTrader } from "./stockTrader";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";

//Triggers dispatches (May need to be broken down into multiple Middlewares chained together)
const producerMiddleWare = (rawStore) => {
  const socket = socketIOClient(WEBSOCKET_URL);

  const dispatch = (action) => {
    switch (action.type) {
      case SEARCH_SYMBOL: {
        let symbol = action.payload;

        Promise.all([
          quoteFetch(symbol),
          companyFetch(symbol),
          newsFetch(symbol),
          statsFetch(symbol),
          peersFetch(symbol),
        ])
          .then((dataArray) => {
            let [
              quoteInfo,
              companyInfo,
              newsInfo,
              statInfo,
              peersInfo,
            ] = dataArray;
            rawStore.dispatch({
              type: NEW_TICKER_DATA,
              payload: {
                symbol,
                data: {
                  quoteInfo,
                  newsInfo,
                  companyInfo,
                  statInfo,
                  peersInfo,
                },
              },
            });

            socket.emit(NEW_SYMBOL, symbol);
          })
          .catch((e) => {
            rawStore.dispatch({ type: SEARCH_ERROR, payload: e.message });
          });
        break;
      }
      case SEARCH_INDEXES: {
        let indexes = action.payload;
        Promise.all(indexes.map((index) => quoteFetch(index)))
          .then((dataArray) => {
            rawStore.dispatch({
              type: NEW_INDEX_DATA,
              payload: dataArray,
            });
            socket.emit(NEW_INDEXES, indexes);
          })
          .catch((e) => {
            rawStore.dispatch({ type: SEARCH_ERROR, payload: e.message });
          });
        break;
      }

      case FETCH_HISTORY: {
        let { symbol, period } = action.payload;
        historyFetch(symbol, period).then((data) => {
          rawStore.dispatch({ type: NEW_HISTORY_DATA, payload: data });
        });
        break;
      }
      default:
        rawStore.dispatch(action);
    }
  };

  socket.on(REAL_TIME_QUOTE_DATA, (data) => {
    rawStore.dispatch({ type: NEW_QUOTE_DATA, payload: data });
  });

  socket.on(REAL_TIME_INDEX_DATA, (dataArray) => {
    rawStore.dispatch({ type: NEW_INDEX_DATA, payload: dataArray });
  });

  return {
    ...rawStore,
    dispatch,
  };
};
//May need to break down producerMiddleware into multiple Middlewares to handle individual component requirements
const dataStore = producerMiddleWare(
  createStore(
    combineReducers({
      stocks: stockReducer,
      errors: errorReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  useEffect(() => {
    dataStore.dispatch({ type: SEARCH_SYMBOL, payload: INITIAL_STOCK });
    dataStore.dispatch({
      type: SEARCH_INDEXES,
      payload: ["MSFT", "GOOGL", "AMZN"],
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={dataStore}>
        <StockTrader />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
