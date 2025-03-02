import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserManagement from '../UserManagement';

describe('UserManagement Component', () => {
	test('renders the app title', () => {
		render(<UserManagement />);
		expect(screen.getByText('app.title')).toBeInTheDocument();
	});

	test('shows initial users', () => {
		render(<UserManagement />);
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('Jane Smith')).toBeInTheDocument();
	});

	test('opens add user dialog when add button is clicked', async () => {
		render(<UserManagement />);

		// Click the Add User button
		fireEvent.click(screen.getByText('buttons.addUser'));

		// Check that dialog appears with correct title
		expect(screen.getByText('form.addUser')).toBeInTheDocument();
	});

	test('adds a new user', async () => {
		render(<UserManagement />);

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
		render(<UserManagement />);

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
		render(<UserManagement />);

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
		render(<UserManagement />);

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
