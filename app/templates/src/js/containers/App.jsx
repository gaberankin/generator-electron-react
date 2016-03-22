import React, { Component } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ipcRenderer } from 'electron';

import <%= jsClassName %> from './<%= jsClassName %>';
import * as reducers from '../reducers';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleWare(reducer);

export default class App extends Component {
	componentDidMount() {
		ipcRenderer.send('initialize');
	}
	render() {
		return (
			<div>
				<Provider store={store}>
					<<%= jsClassName %> />
				</Provider>
			</div>
		);
	}
}
