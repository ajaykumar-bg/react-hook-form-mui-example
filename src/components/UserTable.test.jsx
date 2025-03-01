import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from './UserTable';

describe('UserTable Component', () => {
	const mockUsers = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			phone: '1234567890',
			role: 'Admin',
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			phone: '0987654321',
			role: 'User',
		},
	];

	const mockEdit = jest.fn();
	const mockDelete = jest.fn();

	test('renders table with user data', () => {
		render(
			<UserTable users={mockUsers} onEdit={mockEdit} onDelete={mockDelete} />
		);

		// Check for column headers
		expect(screen.getByText('table.name')).toBeInTheDocument();
		expect(screen.getByText('table.email')).toBeInTheDocument();
		expect(screen.getByText('table.phone')).toBeInTheDocument();
		expect(screen.getByText('table.role')).toBeInTheDocument();
		expect(screen.getByText('table.actions')).toBeInTheDocument();

		// Check for user data
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('jane@example.com')).toBeInTheDocument();
		expect(screen.getByText('1234567890')).toBeInTheDocument();
		expect(screen.getByText('User')).toBeInTheDocument();
	});

	test('calls onEdit when edit button is clicked', () => {
		render(
			<UserTable users={mockUsers} onEdit={mockEdit} onDelete={mockDelete} />
		);

		const editButtons = screen.getAllByTestId('EditIcon');
		fireEvent.click(editButtons[0]);

		expect(mockEdit).toHaveBeenCalledWith(mockUsers[0]);
	});

	test('calls onDelete when delete button is clicked', () => {
		render(
			<UserTable users={mockUsers} onEdit={mockEdit} onDelete={mockDelete} />
		);

		const deleteButtons = screen.getAllByTestId('DeleteIcon');
		fireEvent.click(deleteButtons[1]);

		expect(mockDelete).toHaveBeenCalledWith(mockUsers[1].id);
	});

	test('shows "No users found" when users array is empty', () => {
		render(<UserTable users={[]} onEdit={mockEdit} onDelete={mockDelete} />);

		expect(screen.getByText('table.noUsers')).toBeInTheDocument();
	});
});
