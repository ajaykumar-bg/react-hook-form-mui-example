import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import usersReducer, {
	fetchUsersRequest,
	fetchUserRequest,
	createUserRequest,
	updateUserRequest,
	deleteUserRequest,
} from '../../features/users/usersSlice';
import { usersSaga } from '../../features/users/usersSaga';

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
			return user ? res(ctx.json(user)) : res(ctx.status(404));
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

describe('Integration Tests: Redux Store + Sagas + API', () => {
	let store;

	beforeEach(() => {
		const sagaMiddleware = createSagaMiddleware();
		store = configureStore({
			reducer: {
				users: usersReducer,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
		});
		sagaMiddleware.run(usersSaga);
	});

	test('should fetch users from API and update store', async () => {
		// Initial state
		expect(store.getState().users.users).toEqual([]);
		expect(store.getState().users.loading).toBe(false);

		// Dispatch action to fetch users
		store.dispatch(fetchUsersRequest());

		// Check loading state
		expect(store.getState().users.loading).toBe(true);

		// Wait for the saga to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check updated state
		expect(store.getState().users.loading).toBe(false);
		expect(store.getState().users.users).toEqual(mockUsers);
		expect(store.getState().users.error).toBe(null);
	});

	test('should fetch single user from API and update store', async () => {
		// Dispatch action to fetch a user
		store.dispatch(fetchUserRequest(1));

		// Check loading state
		expect(store.getState().users.loading).toBe(true);

		// Wait for the saga to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check updated state
		expect(store.getState().users.loading).toBe(false);
		expect(store.getState().users.user).toEqual(mockUsers[0]);
		expect(store.getState().users.error).toBe(null);
	});

	test('should create a user via API and update store', async () => {
		const newUser = { name: 'Bob Johnson', email: 'bob@example.com' };

		// Dispatch action to create a user
		store.dispatch(createUserRequest(newUser));

		// Check loading state
		expect(store.getState().users.loading).toBe(true);

		// Wait for the saga to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check updated state
		expect(store.getState().users.loading).toBe(false);
		expect(store.getState().users.users).toContainEqual({
			id: 3,
			...newUser,
		});
		expect(store.getState().users.error).toBe(null);
	});

	test('should update a user via API and update store', async () => {
		// First, fetch users to populate the store
		store.dispatch(fetchUsersRequest());
		await new Promise((resolve) => setTimeout(resolve, 100));

		const updatedData = {
			name: 'John Updated',
			email: 'john.updated@example.com',
		};

		// Dispatch action to update a user
		store.dispatch(
			updateUserRequest({
				id: 1,
				userData: updatedData,
			})
		);

		// Check loading state
		expect(store.getState().users.loading).toBe(true);

		// Wait for the saga to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check updated state
		expect(store.getState().users.loading).toBe(false);
		expect(store.getState().users.users.find((u) => u.id === 1)).toEqual({
			id: 1,
			...updatedData,
		});
		expect(store.getState().users.user).toEqual({
			id: 1,
			...updatedData,
		});
		expect(store.getState().users.error).toBe(null);
	});

	test('should delete a user via API and update store', async () => {
		// First, fetch users to populate the store
		store.dispatch(fetchUsersRequest());
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Make sure we have both users
		expect(store.getState().users.users.length).toBe(2);

		// Dispatch action to delete a user
		store.dispatch(deleteUserRequest(1));

		// Check loading state
		expect(store.getState().users.loading).toBe(true);

		// Wait for the saga to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check updated state
		expect(store.getState().users.loading).toBe(false);
		expect(store.getState().users.users.length).toBe(1);
		expect(
			store.getState().users.users.find((u) => u.id === 1)
		).toBeUndefined();
		expect(store.getState().users.error).toBe(null);
	});

	test('should handle API errors', async () => {
		// Mock a server error
		server.use(
			rest.get(
				'https://jsonplaceholder.typicode.com/users',
				(req, res, ctx) => {
					return res(ctx.status(500), ctx.json({ message: 'Server error' }));
				}
			)
		);

		// Dispatch action to fetch users
		store.dispatch(fetchUsersRequest());

		// Wait for the saga to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check error state
		expect(store.getState().users.loading).toBe(false);
		expect(store.getState().users.error).toBe('Failed to fetch users');
	});
});
