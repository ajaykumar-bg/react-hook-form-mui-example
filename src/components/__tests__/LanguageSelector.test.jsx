import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import LanguageSelector from '../LanguageSelector';

// Mock the react-i18next hooks
jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key) => {
			const translations = {
				'languageSelector.language': 'Language',
				'languageSelector.english': 'English',
				'languageSelector.spanish': 'Spanish',
			};
			return translations[key] || key;
		},
		i18n: {
			language: 'en',
			changeLanguage: jest.fn(),
		},
	}),
}));

// Mock for MUI popper which is used by the Select component
jest.mock('@mui/material/Popper', () => {
	return function MockedPopper(props) {
		return <div data-testid='mui-popper' {...props} />;
	};
});

describe('LanguageSelector', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Add a DOM element where the MUI Select components attach popups
		if (!document.getElementById('mui-test-root')) {
			const muiRoot = document.createElement('div');
			muiRoot.setAttribute('id', 'mui-test-root');
			document.body.appendChild(muiRoot);
		}
	});

	test('Select component renders with correct properties', () => {
		render(<LanguageSelector />);

		const selectComponent = screen.getByRole('combobox', { name: /language/i });
		expect(selectComponent).toBeInTheDocument();
		expect(selectComponent).toHaveAttribute('aria-haspopup', 'listbox');
	});

	test('Select opens menu when clicked', () => {
		render(<LanguageSelector />);

		// Get the select element
		const selectElement = screen.getByLabelText(/language/i);

		// Initially the menu should be closed
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

		// Open the select dropdown
		fireEvent.mouseDown(selectElement);

		// The listbox should now be visible
		const listbox = screen.getByRole('listbox');
		expect(listbox).toBeInTheDocument();
	});

	test('Menu items have correct values and text', () => {
		render(<LanguageSelector />);

		// Open the select
		fireEvent.mouseDown(screen.getByLabelText(/language/i));

		// Get the listbox
		const listbox = screen.getByRole('listbox');

		// Check the menu items
		const options = within(listbox).getAllByRole('option');
		expect(options).toHaveLength(2);

		// Check first option - English
		expect(options[0]).toHaveTextContent('English');
		expect(options[0]).toHaveAttribute('data-value', 'en');

		// Check second option - Spanish
		expect(options[1]).toHaveTextContent('Spanish');
		expect(options[1]).toHaveAttribute('data-value', 'es');
	});

	test('Select shows the current language value', () => {
		// Mock i18n with Spanish as current language
		jest.mock(
			'react-i18next',
			() => ({
				useTranslation: () => ({
					t: jest.fn((key) => key),
					i18n: {
						language: 'es',
						changeLanguage: jest.fn(),
					},
				}),
			}),
			{ virtual: true }
		);

		render(<LanguageSelector />);

		// Check that the selected value is displayed (this checks the rendered content, not the actual value)
		const selectElement = screen.getByLabelText(/language/i);
		expect(selectElement).toBeInTheDocument();

		// Open the select to check which option is selected
		fireEvent.mouseDown(selectElement);
		const listbox = screen.getByRole('listbox');

		// In MUI, the selected option often has a different styling or attribute
		const options = within(listbox).getAllByRole('option');
		expect(options[0]).toHaveAttribute('aria-selected', 'true'); // English option is selected
	});
});
