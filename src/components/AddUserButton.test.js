import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddUserButton from './AddUserButton';

describe('AddUserButton Component', () => {
	test('renders add user button', () => {
		const mockClick = jest.fn();
		render(<AddUserButton onAddClick={mockClick} />);

		expect(screen.getByText('buttons.addUser')).toBeInTheDocument();
	});

	test('calls onAddClick when button is clicked', () => {
		const mockClick = jest.fn();
		render(<AddUserButton onAddClick={mockClick} />);

		fireEvent.click(screen.getByText('buttons.addUser'));

		expect(mockClick).toHaveBeenCalled();
	});
});
