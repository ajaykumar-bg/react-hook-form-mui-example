import { usersSlice } from './usersSlice';

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
