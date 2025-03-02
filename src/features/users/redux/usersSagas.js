import { call, put, takeLatest } from 'redux-saga/effects';
import {
	fetchUsersRequest,
	fetchUsersSuccess,
	fetchUsersFailure,
	fetchUserRequest,
	fetchUserSuccess,
	fetchUserFailure,
	createUserRequest,
	createUserSuccess,
	createUserFailure,
	updateUserRequest,
	updateUserSuccess,
	updateUserFailure,
	deleteUserRequest,
	deleteUserSuccess,
	deleteUserFailure,
} from './usersActions';
import {
	fetchUsers,
	fetchUserById,
	createUser,
	updateUser,
	deleteUser,
} from '../api/userApi';

function* fetchUsersSaga() {
	try {
		const users = yield call(fetchUsers);
		yield put(fetchUsersSuccess(users));
	} catch (error) {
		yield put(fetchUsersFailure(error.message));
	}
}

function* fetchUserSaga(action) {
	try {
		const user = yield call(fetchUserById, action.payload);
		yield put(fetchUserSuccess(user));
	} catch (error) {
		yield put(fetchUserFailure(error.message));
	}
}

function* createUserSaga(action) {
	try {
		const newUser = yield call(createUser, action.payload);
		yield put(createUserSuccess(newUser));
	} catch (error) {
		yield put(createUserFailure(error.message));
	}
}

function* updateUserSaga(action) {
	try {
		const { id, userData } = action.payload;
		const updatedUser = yield call(updateUser, id, userData);
		yield put(updateUserSuccess(updatedUser));
	} catch (error) {
		yield put(updateUserFailure(error.message));
	}
}

function* deleteUserSaga(action) {
	try {
		yield call(deleteUser, action.payload);
		yield put(deleteUserSuccess(action.payload));
	} catch (error) {
		yield put(deleteUserFailure(error.message));
	}
}

export function* usersSaga() {
	yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
	yield takeLatest(fetchUserRequest.type, fetchUserSaga);
	yield takeLatest(createUserRequest.type, createUserSaga);
	yield takeLatest(updateUserRequest.type, updateUserSaga);
	yield takeLatest(deleteUserRequest.type, deleteUserSaga);
}
