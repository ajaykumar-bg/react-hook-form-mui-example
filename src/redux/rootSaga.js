import { all } from 'redux-saga/effects';
import { usersSaga } from '../features/users/redux/usersSagas';
import { authSaga } from '../features/auth/redux/authSagas';

export function* rootSaga() {
	yield all([usersSaga(), authSaga()]);
}
