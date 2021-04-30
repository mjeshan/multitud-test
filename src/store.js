import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import {isProd} from './request/config';

const middleware = isProd ? applyMiddleware(promise, thunk): applyMiddleware(promise, thunk, logger);
export default createStore(reducer, middleware);

