import { runSaga } from 'redux-saga';
import {
	fetchUsersSaga,
	fetchUserSaga,
	createUserSaga,
	updateUserSaga,
	deleteUserSaga,
	usersSaga,
} from '../usersSagas';
import {
	fetchUsersSuccess,
	fetchUsersFailure,
	fetchUserSuccess,
	fetchUserFailure,
	createUserSuccess,
	createUserFailure,
	updateUserSuccess,
	updateUserFailure,
	deleteUserSuccess,
	deleteUserFailure,
} from '../usersSlice';
import * as api from '../../api/userApi';
import { takeLatest } from 'redux-saga/effects';

// Mock the API functions
jest.mock('../../api/userApi', () => ({
	fetchUsers: jest.fn(),
	fetchUserById: jest.fn(),
	createUser: jest.fn(),
	updateUser: jest.fn(),
	deleteUser: jest.fn(),
}));

describe('usersSaga', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('fetchUsersSaga', () => {
		test('should call api and dispatch success action', async () => {
			const mockUsers = [{ id: 1, name: 'John' }];
			api.fetchUsers.mockResolvedValue(mockUsers);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				fetchUsersSaga
			).toPromise();

			expect(api.fetchUsers).toHaveBeenCalledTimes(1);
			expect(dispatched).toEqual([fetchUsersSuccess(mockUsers)]);
		});

		test('should handle errors', async () => {
			const error = new Error('API call failed');
			api.fetchUsers.mockRejectedValue(error);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				fetchUsersSaga
			).toPromise();

			expect(api.fetchUsers).toHaveBeenCalledTimes(1);
			expect(dispatched).toEqual([fetchUsersFailure(error.message)]);
		});
	});

	describe('fetchUserSaga', () => {
		test('should call api and dispatch success action', async () => {
			const mockUser = { id: 1, name: 'John' };
			api.fetchUserById.mockResolvedValue(mockUser);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				fetchUserSaga,
				{ payload: 1 }
			).toPromise();

			expect(api.fetchUserById).toHaveBeenCalledWith(1);
			expect(dispatched).toEqual([fetchUserSuccess(mockUser)]);
		});

		test('should handle errors', async () => {
			const error = new Error('API call failed');
			api.fetchUserById.mockRejectedValue(error);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				fetchUserSaga,
				{ payload: 1 }
			).toPromise();

			expect(api.fetchUserById).toHaveBeenCalledWith(1);
			expect(dispatched).toEqual([fetchUserFailure(error.message)]);
		});
	});

	describe('createUserSaga', () => {
		test('should call api and dispatch success action', async () => {
			const newUserData = { name: 'Bob' };
			const createdUser = { id: 3, ...newUserData };
			api.createUser.mockResolvedValue(createdUser);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				createUserSaga,
				{ payload: newUserData }
			).toPromise();

			expect(api.createUser).toHaveBeenCalledWith(newUserData);
			expect(dispatched).toEqual([createUserSuccess(createdUser)]);
		});

		test('should handle errors', async () => {
			const error = new Error('API call failed');
			api.createUser.mockRejectedValue(error);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				createUserSaga,
				{ payload: { name: 'Bob' } }
			).toPromise();

			expect(api.createUser).toHaveBeenCalledTimes(1);
			expect(dispatched).toEqual([createUserFailure(error.message)]);
		});
	});

	describe('updateUserSaga', () => {
		test('should call api and dispatch success action', async () => {
			const userData = { name: 'John Updated' };
			const updatedUser = { id: 1, ...userData };
			api.updateUser.mockResolvedValue(updatedUser);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				updateUserSaga,
				{ payload: { id: 1, userData } }
			).toPromise();

			expect(api.updateUser).toHaveBeenCalledWith(1, userData);
			expect(dispatched).toEqual([updateUserSuccess(updatedUser)]);
		});

		test('should handle errors', async () => {
			const error = new Error('API call failed');
			api.updateUser.mockRejectedValue(error);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				updateUserSaga,
				{ payload: { id: 1, userData: { name: 'John Updated' } } }
			).toPromise();

			expect(api.updateUser).toHaveBeenCalledTimes(1);
			expect(dispatched).toEqual([updateUserFailure(error.message)]);
		});
	});

	describe('deleteUserSaga', () => {
		test('should call api and dispatch success action', async () => {
			api.deleteUser.mockResolvedValue(1);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				deleteUserSaga,
				{ payload: 1 }
			).toPromise();

			expect(api.deleteUser).toHaveBeenCalledWith(1);
			expect(dispatched).toEqual([deleteUserSuccess(1)]);
		});

		test('should handle errors', async () => {
			const error = new Error('API call failed');
			api.deleteUser.mockRejectedValue(error);

			const dispatched = [];
			await runSaga(
				{
					dispatch: (action) => dispatched.push(action),
				},
				deleteUserSaga,
				{ payload: 1 }
			).toPromise();

			expect(api.deleteUser).toHaveBeenCalledTimes(1);
			expect(dispatched).toEqual([deleteUserFailure(error.message)]);
		});
	});

	describe('usersSaga', () => {
		test('should take the latest actions', () => {
			const generator = usersSaga();

			// For each iteration, expect it to be a takeLatest effect
			// Exhaustively check all expected takeLatest watchers

			expect(generator.next().value).toEqual(
				takeLatest('users/fetchUsersRequest', fetchUsersSaga)
			);

			expect(generator.next().value).toEqual(
				takeLatest('users/fetchUserRequest', fetchUserSaga)
			);

			expect(generator.next().value).toEqual(
				takeLatest('users/createUserRequest', createUserSaga)
			);

			expect(generator.next().value).toEqual(
				takeLatest('users/updateUserRequest', updateUserSaga)
			);

			expect(generator.next().value).toEqual(
				takeLatest('users/deleteUserRequest', deleteUserSaga)
			);

			// Ensure the generator is done
			expect(generator.next().done).toBeTruthy();
		});
	});
});
