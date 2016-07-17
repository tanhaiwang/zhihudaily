'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import Reducer from '../reducers';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promise, createLogger())(createStore);

export default function configureStore (initState) {
  	const store = createStoreWithMiddleware(Reducer, initState);
  	return store;
}
