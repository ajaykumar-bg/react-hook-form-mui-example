import { createSlice } from '@reduxjs/toolkit';
import { MUTUAL_FUNDS } from '../data/mutualFunds';

const initialState = {
	mutualFunds: MUTUAL_FUNDS,
	loading: false,
	error: null,
	selectedMutualFund: null,
};

export const mutualFundsSlice = createSlice({
	name: 'mutualFunds',
	initialState,
	reducers: {
		// Fetch all MutualFunds
		fetchMutualFundsRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchMutualFundsSuccess: (state, action) => {
			state.mutualFunds = action.payload;
			state.loading = false;
			state.error = null;
		},
		fetchMutualFundsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// Fetch MutualFund by ID
		fetchMutualFundRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchMutualFundSuccess: (state, action) => {
			const { meta, data } = action.payload;
			state.selectedMutualFund = {
				schemeCode: meta.scheme_code,
				schemeName: meta.scheme_name,
				data: data.reverse(),
			};
			state.loading = false;
		},
		fetchMutualFundFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		selectMutualFundForEdit: (state, action) => {
			state.selectedMutualFund = action.payload;
		},
		clearSelectedMutualFund: (state) => {
			state.selectedMutualFund = null;
		},

		// Action creator for saga failure responses
		apiFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchMutualFundsRequest,
	fetchMutualFundsSuccess,
	fetchMutualFundsFailure,

	fetchMutualFundRequest,
	fetchMutualFundSuccess,
	fetchMutualFundFailure,

	selectMutualFundForEdit,
	clearSelectedMutualFund,
	apiFailure,
} = mutualFundsSlice.actions;

// Selectors
export const selectMutualFunds = (state) => state.mutualFunds.mutualFunds;
export const selectLoading = (state) => state.mutualFunds.loading;
export const selectError = (state) => state.mutualFunds.error;
export const selectSelectedMutualFund = (state) =>
	state.mutualFunds.selectedMutualFund;

export default mutualFundsSlice.reducer;
