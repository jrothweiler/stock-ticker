import React, { useEffect } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {quoteFetch, companyFetch, newsFetch, statsFetch} from './utils/serverUtils';

import stockReducer from './reducers/stockReducer';
import { INITIAL_STOCK } from './utils/constants';



//Triggers dispatches (May need to be broken down into multiple Middlewares chained together)
const producerMiddleWare = (rawStore) => {

  const dispatch = (action) => {
    //Trigger dispatches here
    switch (action.type) {
      case 'searchSymbol': {
        let symbol = action.payload;

        Promise.all([quoteFetch(symbol), companyFetch(symbol), newsFetch(symbol), statsFetch(symbol)]).then(dataArray => {
          let [quoteInfo, companyInfo, newsInfo, statInfo] = dataArray;
          rawStore.dispatch({type: 'newTickerData', payload: {
            quoteInfo,
            newsInfo,
            companyInfo,
            statInfo
          }})
        })
      }
      default:
        rawStore.dispatch(action);
    }
  }

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
      <div>Hello world!</div>
    </Provider>
  );
}

export default App;
