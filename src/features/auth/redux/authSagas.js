import { call, put, takeLatest, all } from 'redux-saga/effects';
import { authApi } from '../api/authApi';
import {
	loginRequest,
	loginSuccess,
	logoutRequest,
	logoutSuccess,
	authFailure,
} from './authSlice';

// Worker Sagas
function* login(action) {
	try {
		const response = yield call(authApi.login, action.payload);
		yield put(loginSuccess(response.data));
	} catch (error) {
		yield put(authFailure(error.message));
	}
}

function* logout() {
	try {
		yield call(authApi.logout);
		yield put(logoutSuccess());
	} catch (error) {
		yield put(authFailure(error.message));
	}
}

// Watcher Sagas
function* watchLogin() {
	yield takeLatest(loginRequest.type, login);
}

function* watchLogout() {
	yield takeLatest(logoutRequest.type, logout);
}

// Root Saga
export function* authSaga() {
	yield all([watchLogin(), watchLogout()]);
}
