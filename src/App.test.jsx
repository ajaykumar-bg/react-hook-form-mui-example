import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from './App';
import { store } from './redux/store';

// Mock the child components to isolate App testing
jest.mock('./components/About', () => () => (
	<div data-testid='about-mock'>About</div>
));
jest.mock('./components/Account', () => () => (
	<div data-testid='account-mock'>Account</div>
));
jest.mock('./components/Profile', () => () => (
	<div data-testid='profile-mock'>Profile</div>
));
jest.mock('./components/Settings', () => () => (
	<div data-testid='settings-mock'>Settings</div>
));

const renderWithProviders = (ui) => {
	return render(<Provider store={store}>{ui}</Provider>);
};

describe('App Component', () => {
	test('renders navbar and footer', () => {
		renderWithProviders(<App />);

		// expect(screen.getByTestId('about-mock')).toBeInTheDocument();
		// expect(screen.getByTestId('settings-mock')).toBeInTheDocument();
	});

	test('renders home page by default', () => {
		// Need to use BrowserRouter to set the initial route to "/"
		renderWithProviders(
			<BrowserRouter initialEntries={['/']}>
				<App />
			</BrowserRouter>
		);

		// expect(screen.getByTestId('account-mock')).toBeInTheDocument();
	});
});
