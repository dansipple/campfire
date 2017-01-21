import React          from 'react';
import { render }     from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import Root from './containers/Root';
// load our css
require('./styles/style.less');

const rootElement = document.getElementById('root');

render( <Root store={store} />, rootElement );