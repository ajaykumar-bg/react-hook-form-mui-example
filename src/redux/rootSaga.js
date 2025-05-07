import { all } from 'redux-saga/effects';
import { usersSaga } from '../features/users/redux/usersSagas';
import { mutualFundsSaga } from '../features/funds/redux/mutualFundsSagas';
// import { authSaga } from '../features/auth/redux/authSagas';

export function* rootSaga() {
	yield all([
		usersSaga(),
		mutualFundsSaga(),
		// authSaga(),
	]);
}
