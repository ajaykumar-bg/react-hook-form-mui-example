import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userApi from '../userApi';

describe('userApi', () => {
	let mock;
	const API_URL = 'http://localhost:5000';

	// Sample user data for testing
	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678' },
	];

	const newUser = {
		name: 'Alice Johnson',
		email: 'alice@example.com',
		phone: '555-9012',
	};
	const createdUser = { id: 3, ...newUser };

	const updatedUser = {
		id: 1,
		name: 'John Updated',
		email: 'john.updated@example.com',
		phone: '555-4321',
	};

	beforeEach(() => {
		// Create a new instance of MockAdapter before each test
		mock = new MockAdapter(axios);
	});

	afterEach(() => {
		// Reset the mock after each test
		mock.reset();
	});

	describe('getUsers', () => {
		it('should fetch all users successfully', async () => {
			// Mock the API response
			mock.onGet(`${API_URL}/users`).reply(200, users);

			// Call the API method
			const response = await userApi.getUsers();

			// Assertions
			expect(response.status).toBe(200);
			expect(response.data).toEqual(users);
			expect(response.data.length).toBe(2);
		});

		it('should handle error when fetching users fails', async () => {
			// Mock API error response
			mock.onGet(`${API_URL}/users`).reply(500);

			// Assertions
			await expect(userApi.getUsers()).rejects.toThrow();
		});
	});

	describe('getUserById', () => {
		it('should fetch a specific user by ID', async () => {
			const userId = 1;

			// Mock the API response
			mock.onGet(`${API_URL}/users/${userId}`).reply(200, users[0]);

			// Call the API method
			const response = await userApi.getUserById(userId);

			// Assertions
			expect(response.status).toBe(200);
			expect(response.data).toEqual(users[0]);
			expect(response.data.id).toBe(userId);
		});

		it('should handle error when user is not found', async () => {
			const nonExistentId = 999;

			// Mock API error response
			mock.onGet(`${API_URL}/users/${nonExistentId}`).reply(404);

			// Assertions
			await expect(userApi.getUserById(nonExistentId)).rejects.toThrow();
		});
	});

	describe('createUser', () => {
		it('should create a new user successfully', async () => {
			// Mock the API response
			mock.onPost(`${API_URL}/users`).reply(201, createdUser);

			// Call the API method
			const response = await userApi.createUser(newUser);

			// Assertions
			expect(response.status).toBe(201);
			expect(response.data).toEqual(createdUser);
			expect(response.data.id).toBe(3);
			expect(response.data.name).toBe(newUser.name);
		});

		it('should handle error when creating a user fails', async () => {
			// Mock API error response
			mock.onPost(`${API_URL}/users`).reply(400);

			// Assertions
			await expect(userApi.createUser(newUser)).rejects.toThrow();
		});
	});

	describe('updateUser', () => {
		it('should update an existing user successfully', async () => {
			const userId = 1;

			// Mock the API response
			mock.onPut(`${API_URL}/users/${userId}`).reply(200, updatedUser);

			// Call the API method
			const response = await userApi.updateUser(userId, updatedUser);

			// Assertions
			expect(response.status).toBe(200);
			expect(response.data).toEqual(updatedUser);
			expect(response.data.name).toBe('John Updated');
		});

		it('should handle error when updating a user fails', async () => {
			const userId = 1;

			// Mock API error response
			mock.onPut(`${API_URL}/users/${userId}`).reply(400);

			// Assertions
			await expect(userApi.updateUser(userId, updatedUser)).rejects.toThrow();
		});
	});

	describe('deleteUser', () => {
		it('should delete a user successfully', async () => {
			const userId = 1;

			// Mock the API response
			mock.onDelete(`${API_URL}/users/${userId}`).reply(200, {});

			// Call the API method
			const response = await userApi.deleteUser(userId);

			// Assertions
			expect(response.status).toBe(200);
		});

		it('should handle error when deleting a user fails', async () => {
			const userId = 1;

			// Mock API error response
			mock.onDelete(`${API_URL}/users/${userId}`).reply(400);

			// Assertions
			await expect(userApi.deleteUser(userId)).rejects.toThrow();
		});
	});
});
