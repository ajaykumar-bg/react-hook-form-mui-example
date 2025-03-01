import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// Chnage this to false later, once auth is implemented
	isAuthenticated: true,
	user: null,
	loading: false,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		logoutRequest: (state) => {
			state.loading = true;
		},
		logoutSuccess: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
			state.error = null;
		},
		authFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	loginRequest,
	loginSuccess,
	logoutRequest,
	logoutSuccess,
	authFailure,
} = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
