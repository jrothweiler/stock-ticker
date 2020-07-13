import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import stockReducer from './reducers/stockReducer';

//Listens for changes and orchestrates dispatches 
const orchestratorMiddleware = (baseStore) => {
  let prevState = baseStore.getState();
  
  baseStore.subscribe(() => {
    const nextState = baseStore.getState();
    //Trigger dispatches here

  })
  return baseStore;
}

//Triggers dispatches (May need to be broken down into multiple Middlewares chained together)
const producerMiddleWare = (rawStore) => {

  const dispatch = (action) => {
    //Trigger dispatches here
    switch (action.type) {
      case 'exampleCase': {
      }
      case 'exampleCase2': {
      }
      case 'exampleCase3': {
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
const dataStore = orchestratorMiddleware(
  producerMiddleWare(
    createStore(stockReducer)));

function App() {
  return (
    <Provider store={dataStore}>
    </Provider>
  );
}

export default App;
