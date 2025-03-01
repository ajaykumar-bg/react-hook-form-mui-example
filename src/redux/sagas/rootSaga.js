import { all } from 'redux-saga/effects';
import { usersSaga } from './usersSagas';
import { authSaga } from './authSagas';

export function* rootSaga() {
	yield all([usersSaga(), authSaga()]);
}
