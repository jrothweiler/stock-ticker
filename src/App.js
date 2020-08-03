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
import { INITIAL_STOCK } from "./utils/constants";
import socketIOClient from "socket.io-client";
import { StockTrader } from "./stockTrader";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";

//Triggers dispatches (May need to be broken down into multiple Middlewares chained together)
const producerMiddleWare = (rawStore) => {
  const socket = socketIOClient("http://localhost:3001");

  const dispatch = (action) => {
    //Trigger dispatches here
    switch (action.type) {
      case "searchSymbol": {
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
              type: "newTickerData",
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

            socket.emit("newSymbol", symbol);
          })
          .catch((e) => {
            rawStore.dispatch({ type: "searchError", payload: e.message });
          });
        break;
      }
      case "searchIndexes": {
        let indexes = action.payload;
        Promise.all(indexes.map((index) => quoteFetch(index)))
          .then((dataArray) => {
            rawStore.dispatch({
              type: "newIndexData",
              payload: dataArray,
            });
            socket.emit("newIndexes", indexes);
          })
          .catch((e) => {
            rawStore.dispatch({ type: "searchError", payload: e.message });
          });
        break;
      }

      case "fetchHistory": {
        let { symbol, period } = action.payload;
        historyFetch(symbol, period).then((data) => {
          rawStore.dispatch({ type: "newHistoryData", payload: data });
        });
      }
      default:
        rawStore.dispatch(action);
    }
  };

  socket.on("realTimeQuoteData", (data) => {
    rawStore.dispatch({ type: "newQuoteData", payload: data });
  });

  socket.on("realTimeIndexData", (dataArray) => {
    rawStore.dispatch({ type: "newIndexData", payload: dataArray });
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
    dataStore.dispatch({ type: "searchSymbol", payload: INITIAL_STOCK });
    dataStore.dispatch({
      type: "searchIndexes",
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
