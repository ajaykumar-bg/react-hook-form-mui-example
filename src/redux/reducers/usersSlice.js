import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
	loading: false,
	error: null,
	selectedUser: null,
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		// Action creators for initiating saga requests
		fetchUsersRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		createUserRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		updateUserRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		deleteUserRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		selectUserForEdit: (state, action) => {
			state.selectedUser = action.payload;
		},
		clearSelectedUser: (state) => {
			state.selectedUser = null;
		},

		// Action creators for saga success responses
		fetchUsersSuccess: (state, action) => {
			state.users = action.payload;
			state.loading = false;
			state.error = null;
		},
		createUserSuccess: (state, action) => {
			state.users.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		updateUserSuccess: (state, action) => {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			if (index !== -1) {
				state.users[index] = action.payload;
			}
			state.loading = false;
			state.error = null;
			state.selectedUser = null;
		},
		deleteUserSuccess: (state, action) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
			state.loading = false;
			state.error = null;
		},

		// Action creator for saga failure responses
		apiFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchUsersRequest,
	createUserRequest,
	updateUserRequest,
	deleteUserRequest,
	selectUserForEdit,
	clearSelectedUser,
	fetchUsersSuccess,
	createUserSuccess,
	updateUserSuccess,
	deleteUserSuccess,
	apiFailure,
} = usersSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectSelectedUser = (state) => state.users.selectedUser;

export default usersSlice.reducer;
