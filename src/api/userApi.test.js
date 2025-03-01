import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
	fetchUsers,
	fetchUserById,
	createUser,
	updateUser,
	deleteUser,
} from '../userApi';

// Mock server setup
const mockUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const server = setupServer(
	// GET all users
	rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
		return res(ctx.json(mockUsers));
	}),

	// GET single user
	rest.get(
		'https://jsonplaceholder.typicode.com/users/:id',
		(req, res, ctx) => {
			const { id } = req.params;
			const user = mockUsers.find((user) => user.id === Number(id));
			return user
				? res(ctx.json(user))
				: res(ctx.status(404), ctx.json({ message: 'User not found' }));
		}
	),

	// POST new user
	rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
		const newUser = { id: 3, ...req.body };
		return res(ctx.status(201), ctx.json(newUser));
	}),

	// PUT update user
	rest.put(
		'https://jsonplaceholder.typicode.com/users/:id',
		(req, res, ctx) => {
			const { id } = req.params;
			const updatedUser = { id: Number(id), ...req.body };
			return res(ctx.json(updatedUser));
		}
	),

	// DELETE user
	rest.delete(
		'https://jsonplaceholder.typicode.com/users/:id',
		(req, res, ctx) => {
			return res(ctx.status(200), ctx.json({}));
		}
	)
);

// Enable API mocking before tests
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done
afterAll(() => server.close());

describe('userApi', () => {
	test('fetchUsers should return all users', async () => {
		const users = await fetchUsers();
		expect(users).toEqual(mockUsers);
		expect(users.length).toBe(2);
	});

	test('fetchUserById should return a single user', async () => {
		const user = await fetchUserById(1);
		expect(user).toEqual(mockUsers[0]);
	});

	test('fetchUserById should throw an error if user not found', async () => {
		server.use(
			rest.get(
				'https://jsonplaceholder.typicode.com/users/999',
				(req, res, ctx) => {
					return res(ctx.status(404), ctx.json({ message: 'User not found' }));
				}
			)
		);

		await expect(fetchUserById(999)).rejects.toThrow(
			'Failed to fetch user with id 999'
		);
	});

	test('createUser should create and return a new user', async () => {
		const newUserData = { name: 'Bob Johnson', email: 'bob@example.com' };
		const createdUser = await createUser(newUserData);

		expect(createdUser).toEqual({
			id: 3,
			...newUserData,
		});
	});

	test('updateUser should update and return the user', async () => {
		const updatedData = {
			name: 'John Updated',
			email: 'john.updated@example.com',
		};
		const updatedUser = await updateUser(1, updatedData);

		expect(updatedUser).toEqual({
			id: 1,
			...updatedData,
		});
	});

	test('deleteUser should delete a user and return the id', async () => {
		const result = await deleteUser(1);
		expect(result).toBe(1);
	});

	test('API calls should handle errors properly', async () => {
		// Mock server error for all endpoints
		server.use(
			rest.get(
				'https://jsonplaceholder.typicode.com/users',
				(req, res, ctx) => {
					return res(ctx.status(500));
				}
			),
			rest.get(
				'https://jsonplaceholder.typicode.com/users/:id',
				(req, res, ctx) => {
					return res(ctx.status(500));
				}
			),
			rest.post(
				'https://jsonplaceholder.typicode.com/users',
				(req, res, ctx) => {
					return res(ctx.status(500));
				}
			),
			rest.put(
				'https://jsonplaceholder.typicode.com/users/:id',
				(req, res, ctx) => {
					return res(ctx.status(500));
				}
			),
			rest.delete(
				'https://jsonplaceholder.typicode.com/users/:id',
				(req, res, ctx) => {
					return res(ctx.status(500));
				}
			)
		);

		await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
		await expect(fetchUserById(1)).rejects.toThrow(
			'Failed to fetch user with id 1'
		);
		await expect(createUser({})).rejects.toThrow('Failed to create user');
		await expect(updateUser(1, {})).rejects.toThrow(
			'Failed to update user with id 1'
		);
		await expect(deleteUser(1)).rejects.toThrow(
			'Failed to delete user with id 1'
		);
	});
});
