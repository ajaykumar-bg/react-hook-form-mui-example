import usersReducer, {
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
} from '../reducers/usersSlice';

import { mockUsers, mockUser } from './users.mock';

describe('usersSlice', () => {
	const initialState = {
		users: [],
		selectedUser: null,
		loading: false,
		error: null,
	};

	test('should return the initial state', () => {
		expect(usersReducer(undefined, { type: undefined })).toEqual(initialState);
	});

	// Fetch Users Tests
	test('should handle fetchUsersRequest', () => {
		const nextState = usersReducer(initialState, fetchUsersRequest());
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBe(null);
	});

	test('should handle fetchUsersSuccess', () => {
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			fetchUsersSuccess(mockUsers)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.users).toEqual(mockUsers);
		expect(nextState.error).toBe(null);
	});

	test('should handle fetchUsersFailure', () => {
		const error = 'Failed to fetch users';
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			fetchUsersFailure(error)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.error).toBe(error);
	});

	// Fetch User Tests
	test('should handle fetchUserRequest', () => {
		const nextState = usersReducer(initialState, fetchUserRequest(1));
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBe(null);
	});

	test('should handle fetchUserSuccess', () => {
		const user = { id: 1, name: 'John' };
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			fetchUserSuccess(user)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.user).toEqual(user);
		expect(nextState.error).toBe(null);
	});

	test('should handle fetchUserFailure', () => {
		const error = 'Failed to fetch user';
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			fetchUserFailure(error)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.error).toBe(error);
	});

	// Create User Tests
	test('should handle createUserRequest', () => {
		const nextState = usersReducer(
			initialState,
			createUserRequest({ name: 'John' })
		);
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBe(null);
	});

	test('should handle createUserSuccess', () => {
		const newUser = { id: 1, name: 'John' };
		const nextState = usersReducer(
			{ ...initialState, loading: true, users: [] },
			createUserSuccess(newUser)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.users).toEqual([newUser]);
		expect(nextState.error).toBe(null);
	});

	test('should handle createUserFailure', () => {
		const error = 'Failed to create user';
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			createUserFailure(error)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.error).toBe(error);
	});

	// Update User Tests
	test('should handle updateUserRequest', () => {
		const nextState = usersReducer(
			initialState,
			updateUserRequest({ id: 1, userData: { name: 'Updated' } })
		);
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBe(null);
	});

	test('should handle updateUserSuccess', () => {
		const updatedUser = {
			...mockUsers[0],
			name: 'John Updated',
		};

		const nextState = usersReducer(
			{ ...initialState, loading: true, users: mockUsers },
			updateUserSuccess(updatedUser)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.users).toEqual([
			{
				...mockUsers[0],
				name: 'John Updated',
			},
			{ ...mockUsers[1] },
		]);
		expect(nextState.loading).toBe(false);
		expect(nextState.selectedUser).toBe(null);
		expect(nextState.error).toBe(null);
	});

	test('should handle updateUserFailure', () => {
		const error = 'Failed to update user';
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			updateUserFailure(error)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.error).toBe(error);
	});

	// Delete User Tests
	test('should handle deleteUserRequest', () => {
		const nextState = usersReducer(initialState, deleteUserRequest(1));
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBe(null);
	});

	test('should handle deleteUserSuccess', () => {
		const nextState = usersReducer(
			{ ...initialState, loading: true, users: mockUsers },
			deleteUserSuccess(1)
		);
		expect(nextState.loading).toBe(false);
		expect(nextState.users).toEqual([
			{
				id: '2',
				name: 'Jane Smith',
				email: 'jane@example.com',
				phone: '0987654321',
				role: 'User',
			},
		]);
		expect(nextState.error).toBe(null);
	});

	test('should handle deleteUserFailure', () => {
		const error = 'Failed to delete user';
		const nextState = usersReducer(
			{ ...initialState, loading: true },
			deleteUserFailure(error)
		);

		expect(nextState.loading).toBe(false);
		expect(nextState.error).toBe(error);
	});

	// Set Selected User
	test('should handle selectUserForEdit', () => {
		const nextState = usersReducer(
			{ ...initialState },
			selectUserForEdit(mockUsers[0])
		);
		expect(nextState.selectedUser).toBe(mockUsers[0]);
	});

	// Clear Selected User
	test('should handle clearSelectedUser', () => {
		const nextState = usersReducer(
			{ ...initialState, user: mockUsers[0] },
			clearSelectedUser()
		);

		expect(nextState.selectedUser).toBe(null);
	});

	// Complex state transitions
	test('should handle multiple actions in sequence', () => {
		// Start with initial state
		let state = usersReducer(undefined, { type: undefined });

		// Fetch users starts loading
		state = usersReducer(state, fetchUsersRequest());
		expect(state.loading).toBe(true);

		// Fetch users completes successfully
		state = usersReducer(state, fetchUsersSuccess(mockUsers));
		expect(state.users).toEqual(mockUsers);
		expect(state.loading).toBe(false);

		// Create user starts loading
		const newUser = mockUser;
		state = usersReducer(state, createUserRequest(newUser));
		expect(state.loading).toBe(true);

		// Create user completes successfully
		const createdUser = { id: 3, ...newUser };
		state = usersReducer(state, createUserSuccess(createdUser));
		expect(state.users).toHaveLength(3);
		expect(state.users).toContainEqual(createdUser);
		expect(state.loading).toBe(false);

		// Delete user starts loading
		state = usersReducer(state, deleteUserRequest(1));
		expect(state.loading).toBe(true);

		// Delete user completes successfully
		state = usersReducer(state, deleteUserSuccess(1));
		expect(state.users).toHaveLength(2);
		expect(state.users).not.toContainEqual(mockUsers[0]);
		expect(state.loading).toBe(false);
	});
});
