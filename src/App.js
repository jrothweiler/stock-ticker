import React, { useEffect } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { VisualDisplay } from './components/visualDisplay' 
import stockReducer from './reducers/stockReducer';
import { LatestNews } from './components/latestNews';
import {quoteFetch, companyFetch, newsFetch, statsFetch} from './utils/serverUtils';
import { INITIAL_STOCK } from './utils/constants';

import SearchBar from './components/searchBar';

import socketIOClient from "socket.io-client";





//Triggers dispatches (May need to be broken down into multiple Middlewares chained together)
const producerMiddleWare = (rawStore) => {
  const socket = socketIOClient('http://localhost:3001')

  const dispatch = (action) => {
    //Trigger dispatches here
    switch (action.type) {
      case 'searchSymbol': {
        let symbol = action.payload;

        Promise.all([quoteFetch(symbol), companyFetch(symbol), newsFetch(symbol), statsFetch(symbol)]).then(dataArray => {
          let [quoteInfo, companyInfo, newsInfo, statInfo] = dataArray;
          rawStore.dispatch({type: 'newTickerData', payload: {
              symbol,
              data: {
                quoteInfo,
                newsInfo,
                companyInfo,
                statInfo
              }
            }
          })
        });

        socket.emit('newSymbol', symbol);
      }
      default:
        rawStore.dispatch(action);
    }
  }

  socket.on('realTimeQuoteData', (data) => {
    rawStore.dispatch({ type: 'newQuoteData', payload: data })
  })

  return {
    ...rawStore, 
    dispatch
  }
}
//May need to break down producerMiddleware into multiple Middlewares to handle individual component requirements
const dataStore = producerMiddleWare(createStore(stockReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));




function App() {
  useEffect(() => {
    dataStore.dispatch({ type: 'searchSymbol', payload: INITIAL_STOCK })
  }, [])

  return (
    <Provider store={dataStore}>
      <SearchBar />
      
      <VisualDisplay/>
    </Provider>
  );
}

export default App;
