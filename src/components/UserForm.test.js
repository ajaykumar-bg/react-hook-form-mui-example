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

		expect(screen.getByText('form.addUser')).toBeInTheDocument();
		expect(screen.getByLabelText('form.nameLabel')).toHaveValue('');
		expect(screen.getByLabelText('form.emailLabel')).toHaveValue('');
		expect(screen.getByLabelText('form.phoneLabel')).toHaveValue('');
		expect(screen.getByLabelText('form.roleLabel')).toHaveValue('');
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

		expect(screen.getByText('form.editUser')).toBeInTheDocument();
		expect(screen.getByLabelText('form.nameLabel')).toHaveValue('John Doe');
		expect(screen.getByLabelText('form.emailLabel')).toHaveValue(
			'john@example.com'
		);
		expect(screen.getByLabelText('form.phoneLabel')).toHaveValue('1234567890');
		expect(screen.getByLabelText('form.roleLabel')).toHaveValue('Admin');
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

		fireEvent.click(screen.getByText('form.cancel'));

		expect(mockClose).toHaveBeenCalled();
	});
});
