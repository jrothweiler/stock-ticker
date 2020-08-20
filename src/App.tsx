import React, { useEffect } from "react";
import { createStore, combineReducers, Store, Dispatch } from "redux";
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
  SEARCH_ERROR,
  NEW_TICKER_DATA,
  NEW_INDEX_DATA,
  NEW_HISTORY_DATA,
  NEW_QUOTE_DATA,
  SEARCH_INDEXES,
  FETCH_HISTORY,
  SEARCH_SYMBOL,
  WEBSOCKET_URL,
} from "./utils/constants";
import socketIOClient from "socket.io-client";
import { StockTrader } from "./stockTrader";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";
import type { StockAction, QuoteData, ReduxState } from "./types/reduxTypes";

//Triggers dispatches (May need to be broken down into multiple Middlewares chained together)
const producerMiddleWare = (
  rawStore: Store<ReduxState, StockAction>
): Store<ReduxState, StockAction> => {
  const socket = socketIOClient(WEBSOCKET_URL);

  const dispatch: Dispatch<StockAction> = (action) => {
    // Redux's dispatch type is interesting in that its accepted actions are subtypes of the type you give it.
    // StockAction is a union, meaning we don't know what actual actions are in the variable a above.
    // We know the actions passed in are StockActions, so we coerce this so typescript can work with the action's specific payload type.
    const stockAction = action as StockAction;
    switch (stockAction.type) {
      case SEARCH_SYMBOL: {
        let symbol = stockAction.payload;

        Promise.all([
          quoteFetch(symbol),
          companyFetch(symbol),
          newsFetch(symbol),
          statsFetch(symbol),
          peersFetch(symbol),
        ])
          .then((dataArray) => {
            const [
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
                  historyInfo: null, // history info is fetched separately
                },
              },
            });

            socket.emit("newSymbol", symbol);
          })
          .catch((e) => {
            rawStore.dispatch({ type: SEARCH_ERROR, payload: e.message });
          });
        break;
      }
      case SEARCH_INDEXES: {
        let indexes = stockAction.payload;
        Promise.all(indexes.map((index) => quoteFetch(index)))
          .then((dataArray) => {
            rawStore.dispatch({
              type: NEW_INDEX_DATA,
              payload: dataArray,
            });
            socket.emit("newIndexes", indexes);
          })
          .catch((e) => {
            rawStore.dispatch({ type: SEARCH_ERROR, payload: e.message });
          });
        break;
      }

      case FETCH_HISTORY: {
        let { symbol, period } = stockAction.payload;
        historyFetch(symbol, period).then((data) => {
          rawStore.dispatch({ type: NEW_HISTORY_DATA, payload: data });
        });
        break;
      }
      default:
        rawStore.dispatch(stockAction);
    }

    return action;
  };

  socket.on("realTimeQuoteData", (data: QuoteData) => {
    rawStore.dispatch({ type: NEW_QUOTE_DATA, payload: data });
  });

  socket.on("realTimeIndexData", (dataArray: any) => {
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
    // @ts-ignore
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
