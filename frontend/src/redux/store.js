import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { combinedReducers } from './';
import { reduxInitialState } from './';

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  combinedReducers,
  reduxInitialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;