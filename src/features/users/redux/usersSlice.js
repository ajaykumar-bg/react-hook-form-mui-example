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
		// Fetch all users
		fetchUsersRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchUsersSuccess: (state, action) => {
			state.users = action.payload;
			state.loading = false;
			state.error = null;
		},
		fetchUsersFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// Fetch user by ID
		fetchUserRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchUserSuccess: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		fetchUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// Create new user
		createUserRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		createUserSuccess: (state, action) => {
			state.users.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		createUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// Update exisiting user
		updateUserRequest: (state, action) => {
			state.loading = true;
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
		updateUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// Delete exisiting user
		deleteUserRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		deleteUserSuccess: (state, action) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
			state.loading = false;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		selectUserForEdit: (state, action) => {
			state.selectedUser = action.payload;
		},
		clearSelectedUser: (state) => {
			state.selectedUser = null;
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

	selectUserForEdit,
	clearSelectedUser,
	apiFailure,
} = usersSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectSelectedUser = (state) => state.users.selectedUser;

export default usersSlice.reducer;
