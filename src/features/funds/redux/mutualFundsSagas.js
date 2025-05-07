import { call, put, takeLatest } from 'redux-saga/effects';
import {
	fetchMutualFundsRequest,
	fetchMutualFundsSuccess,
	fetchMutualFundsFailure,
	fetchMutualFundRequest,
	fetchMutualFundSuccess,
	fetchMutualFundFailure,
} from './mutualFundsSlice';
import { fetchMutualFunds, fetchMutualFundById } from '../api/mutualFundApi';

export function* fetchMutualFundsSaga() {
	try {
		const mutualFunds = yield call(fetchMutualFunds);
		yield put(fetchMutualFundsSuccess(mutualFunds));
	} catch (error) {
		yield put(fetchMutualFundsFailure(error.message));
	}
}

export function* fetchMutualFundSaga(action) {
	try {
		const mutualFund = yield call(fetchMutualFundById, action.payload);
		yield put(fetchMutualFundSuccess(mutualFund));
	} catch (error) {
		yield put(fetchMutualFundFailure(error.message));
	}
}

export function* mutualFundsSaga() {
	yield takeLatest(fetchMutualFundsRequest.type, fetchMutualFundsSaga);
	yield takeLatest(fetchMutualFundRequest.type, fetchMutualFundSaga);
}
