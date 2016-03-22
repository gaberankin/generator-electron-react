import * as types from '../constants/ActionTypes';
import {remote, ipcRenderer} from 'electron';

export function beginLoading() {
	return {
		type: types.BEGIN_LOADING
	};
}

export function endLoading() {
	return {
		type: types.END_LOADING
	};
}

export function setAlertText(text) {
	return {
		type: types.SET_ALERT_TEXT,
		text
	};
}
