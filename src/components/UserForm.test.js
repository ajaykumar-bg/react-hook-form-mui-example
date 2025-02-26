import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from './UserForm';

describe('UserForm Component', () => {
	const mockUser = {
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		phone: '1234567890',
		role: 'Admin',
	};

	const mockSubmit = jest.fn();
	const mockClose = jest.fn();

	test('renders form with empty fields for new user', () => {
		render(
			<UserForm
				open={true}
				user={null}
				onClose={mockClose}
				onSubmit={mockSubmit}
			/>
		);

		expect(screen.getByText('Add New User')).toBeInTheDocument();
		expect(screen.getByLabelText('Name')).toHaveValue('');
		expect(screen.getByLabelText('Email')).toHaveValue('');
		expect(screen.getByLabelText('Phone')).toHaveValue('');
		expect(screen.getByLabelText('Role')).toHaveValue('');
	});

	test('renders form with user data for editing', () => {
		render(
			<UserForm
				open={true}
				user={mockUser}
				onClose={mockClose}
				onSubmit={mockSubmit}
			/>
		);

		expect(screen.getByText('Edit User')).toBeInTheDocument();
		expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
		expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
		expect(screen.getByLabelText('Phone')).toHaveValue('1234567890');
		expect(screen.getByLabelText('Role')).toHaveValue('Admin');
	});

	test('calls onSubmit with form data when form is submitted', async () => {
		render(
			<UserForm
				open={true}
				user={null}
				onClose={mockClose}
				onSubmit={mockSubmit}
			/>
		);

		// Fill out the form
		await userEvent.type(screen.getByLabelText('Name'), 'Test User');
		await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
		await userEvent.type(screen.getByLabelText('Phone'), '1234567890');
		await userEvent.type(screen.getByLabelText('Role'), 'Tester');

		// Submit the form
		fireEvent.click(screen.getByText('Add'));

		// Check that onSubmit was called with correct data
		await waitFor(() => {
			expect(mockSubmit).toHaveBeenCalledWith(
				{
					name: 'Test User',
					email: 'test@example.com',
					phone: '1234567890',
					role: 'Tester',
				},
				expect.anything()
			);
		});
	});

	test('calls onClose when cancel button is clicked', () => {
		render(
			<UserForm
				open={true}
				user={null}
				onClose={mockClose}
				onSubmit={mockSubmit}
			/>
		);

		fireEvent.click(screen.getByText('Cancel'));

		expect(mockClose).toHaveBeenCalled();
	});
});
