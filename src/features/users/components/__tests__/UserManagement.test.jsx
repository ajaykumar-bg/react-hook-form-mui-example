import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
	apiFailure,
} from '../../redux/usersSlice';

import UserManagement from '../UserManagement';

// import { store } from '../../../../redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { mockUsers } from '../../__tests__/users.mock';

// Mock the async thunk
jest.mock('../../redux/usersSlice', () => {
	const originalModule = jest.requireActual('../../redux/usersSlice');
	return {
		...originalModule,
		fetchUsersRequest: jest.fn(),
		fetchUsersSuccess: jest.fn(),
		fetchUsersFailure: jest.fn(),
		fetchUserRequest: jest.fn(),
		fetchUserSuccess: jest.fn(),
		fetchUserFailure: jest.fn(),
		createUserRequest: jest.fn(),
		createUserSuccess: jest.fn(),
		createUserFailure: jest.fn(),
		updateUserRequest: jest.fn(),
		updateUserSuccess: jest.fn(),
		updateUserFailure: jest.fn(),
		deleteUserRequest: jest.fn(),
		deleteUserSuccess: jest.fn(),
		deleteUserFailure: jest.fn(),
		selectUserForEdit: jest.fn(),
		clearSelectedUser: jest.fn(),
		apiFailure: jest.fn(),
	};
});

const createMockStore = (preloadedState = {}) => {
	return configureStore({
		reducer: {
			users: usersReducer,
		},
		preloadedState,
	});
};

const mockStore = createMockStore({
	users: {
		users: mockUsers,
		loading: false,
		error: null,
		selectedUser: null,
	},
	auth: {
		isAuthenticated: true,
		user: null,
		loading: false,
		error: null,
	},
});

const renderWithProviders = (ui) => {
	return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe('UserManagement Component', () => {
	test('shows initial users', () => {
		renderWithProviders(<UserManagement />, { mockStore });
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('Jane Smith')).toBeInTheDocument();
	});

	test('opens add user dialog when add button is clicked', async () => {
		renderWithProviders(<UserManagement />);

		// Click the Add User button
		fireEvent.click(screen.getByText('buttons.addUser'));

		// Check that dialog appears with correct title
		expect(screen.getByText('form.addUser')).toBeInTheDocument();
	});

	test('adds a new user', async () => {
		renderWithProviders(<UserManagement />);

		// Click Add User button
		fireEvent.click(screen.getByText('buttons.addUser'));

		// Fill out the form
		await userEvent.type(screen.getByLabelText('form.nameLabel'), 'Test User');
		await userEvent.type(
			screen.getByLabelText('form.emailLabel'),
			'test@example.com'
		);
		await userEvent.type(
			screen.getByLabelText('form.phoneLabel'),
			'1234567890'
		);
		await userEvent.type(screen.getByLabelText('form.roleLabel'), 'Tester');

		// Submit the form
		fireEvent.click(screen.getByText('form.add'));

		// Check that the new user appears in the table
		await waitFor(() => {
			expect(screen.getByText('Test User')).toBeInTheDocument();
			expect(screen.getByText('test@example.com')).toBeInTheDocument();
		});
	});

	test('edits an existing user', async () => {
		renderWithProviders(<UserManagement />);

		// Find edit button for John Doe and click it
		const editButtons = screen.getAllByTestId('EditIcon');
		fireEvent.click(editButtons[0]); // First edit button (John Doe)

		// Check if dialog appears with populated data
		await waitFor(() => {
			expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
		});

		// Change the name
		const nameInput = screen.getByDisplayValue('John Doe');
		await userEvent.clear(nameInput);
		await userEvent.type(nameInput, 'John Updated');

		// Submit the form
		fireEvent.click(screen.getByText('form.update'));

		// Check that the updated user appears in the table
		await waitFor(() => {
			expect(screen.getByText('John Updated')).toBeInTheDocument();
		});
	});

	test('deletes a user', async () => {
		renderWithProviders(<UserManagement />);

		// Initial check
		expect(screen.getByText('Jane Smith')).toBeInTheDocument();

		// Find delete button for Jane Smith and click it
		const deleteButtons = screen.getAllByTestId('DeleteIcon');
		fireEvent.click(deleteButtons[1]); // Second delete button (Jane Smith)

		// Check that Jane Smith is no longer in the document
		await waitFor(() => {
			expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
		});
	});

	test('shows validation errors', async () => {
		renderWithProviders(<UserManagement />);

		// Click Add User button
		fireEvent.click(screen.getByText('buttons.addUser'));

		// Submit the empty form
		fireEvent.click(screen.getByText('form.add'));

		// Check for validation errors
		await waitFor(() => {
			expect(screen.getByText('Name is required')).toBeInTheDocument();
			expect(screen.getByText('Email is required')).toBeInTheDocument();
			expect(screen.getByText('Phone is required')).toBeInTheDocument();
			expect(screen.getByText('Role is required')).toBeInTheDocument();
		});
	});
});
