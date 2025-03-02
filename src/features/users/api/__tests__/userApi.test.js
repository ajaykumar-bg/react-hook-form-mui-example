import { mockUsers } from '../../__tests__/users.mock';
import {
	fetchUsers,
	fetchUserById,
	createUser,
	updateUser,
	deleteUser,
} from '../userApi'; // Adjust the import path as needed
import fetchMock from 'fetch-mock';

const API_URL = 'http://localhost:3030';

jest.mock('fetch-mock', () => ({
	restore: jest.fn(),
	getOnce: jest.fn(),
	postOnce: jest.fn(),
	putOnce: jest.fn(),
	deleteOnce: jest.fn(),
	called: jest.fn(),
	lastOptions: jest.fn(),
}));

const newUser = { name: 'New User', email: 'new@example.com' };

const createdUser = { id: 3, ...newUser };
const updatedUserData = { name: 'Updated Name', email: 'updated@example.com' };
const updatedUser = { id: 1, ...updatedUserData };

describe('User API', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	describe('fetchUsers', () => {
		it('should fetch all users successfully', async () => {
			fetchMock.getOnce(`${API_URL}/users`, {
				status: 200,
				body: mockUsers,
			});

			const result = await fetchUsers();

			expect(result).toEqual(mockUsers);
			expect(fetchMock.called()).toBe(true);
		});

		it('should throw an error when fetch fails', async () => {
			fetchMock.getOnce(`${API_URL}/users`, {
				status: 500,
				body: { message: 'Server error' },
			});

			await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
		});
	});

	describe('fetchUserById', () => {
		it('should fetch a user by id successfully', async () => {
			const userId = 1;
			const user = mockUsers.find((u) => u.id === userId);

			fetchMock.getOnce(`${API_URL}/users/${userId}`, {
				status: 200,
				body: user,
			});

			const result = await fetchUserById(userId);

			expect(result).toEqual(user);
			expect(fetchMock.called()).toBe(true);
		});

		it('should throw an error when user is not found', async () => {
			const userId = 999;

			fetchMock.getOnce(`${API_URL}/users/${userId}`, {
				status: 404,
				body: { message: 'User not found' },
			});

			await expect(fetchUserById(userId)).rejects.toThrow(
				`Failed to fetch user with id ${userId}`
			);
		});
	});

	describe('createUser', () => {
		it('should create a user successfully', async () => {
			fetchMock.postOnce(
				`${API_URL}/users`,
				{
					status: 201,
					body: createdUser,
				},
				{
					body: JSON.stringify(newUser),
				}
			);

			const result = await createUser(newUser);

			expect(result).toEqual(createdUser);
			expect(fetchMock.called()).toBe(true);
			expect(fetchMock.lastOptions().headers['Content-Type']).toBe(
				'application/json'
			);
			expect(fetchMock.lastOptions().body).toBe(JSON.stringify(newUser));
		});

		it('should throw an error when creation fails', async () => {
			fetchMock.postOnce(
				`${API_URL}/users`,
				{
					status: 400,
					body: { message: 'Invalid user data' },
				},
				{
					body: JSON.stringify({ invalid: 'data' }),
				}
			);

			await expect(createUser({ invalid: 'data' })).rejects.toThrow(
				'Failed to create user'
			);
		});
	});

	describe('updateUser', () => {
		it('should update a user successfully', async () => {
			const userId = 1;

			fetchMock.putOnce(
				`${API_URL}/users/${userId}`,
				{
					status: 200,
					body: updatedUser,
				},
				{
					body: JSON.stringify(updatedUserData),
				}
			);

			const result = await updateUser(userId, updatedUserData);

			expect(result).toEqual(updatedUser);
			expect(fetchMock.called()).toBe(true);
			expect(fetchMock.lastOptions().headers['Content-Type']).toBe(
				'application/json'
			);
			expect(fetchMock.lastOptions().body).toBe(
				JSON.stringify(updatedUserData)
			);
		});

		it('should throw an error when update fails', async () => {
			const userId = 999;

			fetchMock.putOnce(`${API_URL}/users/${userId}`, {
				status: 404,
				body: { message: 'User not found' },
			});

			await expect(updateUser(userId, updatedUserData)).rejects.toThrow(
				`Failed to update user with id ${userId}`
			);
		});
	});

	describe('deleteUser', () => {
		it('should delete a user successfully', async () => {
			const userId = 1;

			fetchMock.deleteOnce(`${API_URL}/users/${userId}`, {
				status: 200,
				body: { message: 'User deleted' },
			});

			const result = await deleteUser(userId);

			expect(result).toEqual(userId);
			expect(fetchMock.called()).toBe(true);
		});

		it('should throw an error when deletion fails', async () => {
			const userId = 999;

			fetchMock.deleteOnce(`${API_URL}/users/${userId}`, {
				status: 404,
				body: { message: 'User not found' },
			});

			await expect(deleteUser(userId)).rejects.toThrow(
				`Failed to delete user with id ${userId}`
			);
		});
	});
});
