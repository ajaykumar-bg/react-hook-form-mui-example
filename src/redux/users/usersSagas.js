import { call, put, takeLatest, all } from 'redux-saga/effects';
import { userApi } from '../../api/userApi';
import {
	fetchUsersRequest,
	fetchUsersSuccess,
	createUserRequest,
	createUserSuccess,
	updateUserRequest,
	updateUserSuccess,
	deleteUserRequest,
	deleteUserSuccess,
	apiFailure,
} from './usersSlice';

// Worker Sagas
function* fetchUsers() {
	try {
		const response = yield call(userApi.fetchUsers);
		yield put(fetchUsersSuccess(response.data));
	} catch (error) {
		yield put(apiFailure(error.message));
	}
}

function* createUser(action) {
	try {
		const response = yield call(userApi.createUser, action.payload);
		yield put(createUserSuccess(response.data));
	} catch (error) {
		yield put(apiFailure(error.message));
	}
}

function* updateUser(action) {
	try {
		const response = yield call(userApi.updateUser, action.payload);
		yield put(updateUserSuccess(response.data));
	} catch (error) {
		yield put(apiFailure(error.message));
	}
}

function* deleteUser(action) {
	try {
		yield call(userApi.deleteUser, action.payload);
		yield put(deleteUserSuccess(action.payload));
	} catch (error) {
		yield put(apiFailure(error.message));
	}
}

// Watcher Sagas
function* watchFetchUsers() {
	yield takeLatest(fetchUsersRequest.type, fetchUsers);
}

function* watchCreateUser() {
	yield takeLatest(createUserRequest.type, createUser);
}

function* watchUpdateUser() {
	yield takeLatest(updateUserRequest.type, updateUser);
}

function* watchDeleteUser() {
	yield takeLatest(deleteUserRequest.type, deleteUser);
}

// Root Saga
export function* usersSaga() {
	yield all([
		watchFetchUsers(),
		watchCreateUser(),
		watchUpdateUser(),
		watchDeleteUser(),
	]);
}
