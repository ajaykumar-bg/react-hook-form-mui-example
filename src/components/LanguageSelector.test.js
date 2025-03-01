import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import LanguageSelector from './LanguageSelector';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('@mui/material/Popper', () => {
	return function MockedPopper(props) {
		return <div data-testid='mui-popper' {...props} />;
	};
});

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

// Mock localStorage
const localStorageMock = (() => {
	let store = {};
	return {
		getItem: jest.fn((key) => store[key]),
		setItem: jest.fn((key, value) => {
			store[key] = value;
		}),
		clear: jest.fn(() => {
			store = {};
		}),
	};
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Custom render function with MUI ThemeProvider
const renderWithTheme = (ui) => {
	const theme = createTheme();
	return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('LanguageSelector Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Add a DOM element where the MUI Select components attach popups
		if (!document.getElementById('mui-test-root')) {
			const muiRoot = document.createElement('div');
			muiRoot.setAttribute('id', 'mui-test-root');
			document.body.appendChild(muiRoot);
		}
	});

	test('renders the LanguageSelector component', () => {
		renderWithTheme(<LanguageSelector />);
		// Check if FormControl is rendered
		const selectBox = screen.getByTestId('language-select');
		expect(selectBox).toBeInTheDocument();
	});

	test('renders the LanguageSelector with correct label', () => {
		renderWithTheme(<LanguageSelector />);

		const inputLabel = screen.getByLabelText('Language');
		expect(inputLabel).toBeInTheDocument();
	});

	test('renders the LanguageSelector component with correct props', () => {
		renderWithTheme(<LanguageSelector />);

		const selectElement = screen.getByRole('combobox', { name: /language/i });
		expect(selectElement).toBeInTheDocument();

		// Check for MUI Select specific attributes
		expect(selectElement.closest('div')).toHaveClass('MuiSelect-select');
		expect(selectElement).toHaveAttribute('aria-haspopup', 'listbox');
		expect(selectElement).toHaveAttribute(
			'aria-labelledby',
			'language-select-label language-select'
		);
	});

	test('MUI Select has the correct initial value', () => {
		const { i18n } = require('react-i18next').useTranslation();
		i18n.language = 'en';

		renderWithTheme(<LanguageSelector />);

		const selectElement = screen.getByRole('combobox', { name: /language/i });
		expect(selectElement).toHaveTextContent('English');
	});

	test('opens dropdown menu when clicked', () => {
		renderWithTheme(<LanguageSelector />);

		// Select should be closed initially
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

		// Open the select dropdown
		const selectElement = screen.getByRole('combobox', { name: /language/i });
		fireEvent.mouseDown(selectElement);

		// Menu should now be open
		const menu = screen.getByRole('listbox');
		expect(menu).toBeInTheDocument();
	});

	test('menu contains correct language options', () => {
		renderWithTheme(<LanguageSelector />);

		// Open the select dropdown
		const selectElement = screen.getByRole('combobox', { name: /language/i });
		fireEvent.mouseDown(selectElement);

		// Check menu items
		const menu = screen.getByRole('listbox');
		const options = within(menu).getAllByRole('option');

		expect(options).toHaveLength(2);
		expect(options[0]).toHaveTextContent('English');
		expect(options[1]).toHaveTextContent('Spanish');
	});

	test('calls changeLanguage with correct value when new language is selected', async () => {
		const { i18n } = require('react-i18next').useTranslation();

		renderWithTheme(<LanguageSelector />);

		// Open the select dropdown
		const selectElement = screen.getByRole('combobox', {
			name: /language/i,
		});
		fireEvent.mouseDown(selectElement);

		// Check menu items
		const menu = screen.getByRole('listbox');
		const options = within(menu).getAllByRole('option');

		expect(options).toHaveLength(2);
		expect(options[0]).toHaveTextContent('English');
		expect(options[1]).toHaveTextContent('Spanish');

		await fireEvent.click(options[1]);

		// const spanishOption = screen.getByTestId('language-option-spanish');
		// fireEvent.mouseDown(spanishOption);

		// Check if changeLanguage was called with the correct value
		expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
	});

	test('stores selected language in localStorage', () => {
		renderWithTheme(<LanguageSelector />);

		// Open the select dropdown
		const selectElement = screen.getByRole('combobox', { name: /language/i });
		fireEvent.mouseDown(selectElement);

		// Select the Spanish option
		const spanishOption = screen.getByTestId('language-option-spanish');
		fireEvent.mouseDown(spanishOption);

		// Check localStorage
		expect(localStorage.setItem).toHaveBeenCalledWith('language', 'es');
	});

	test('displays the correct language when i18n.language changes', () => {
		// Setup with English
		let { i18n } = require('react-i18next').useTranslation();
		i18n.language = 'en';

		const { rerender } = renderWithTheme(<LanguageSelector />);
		let selectElement = screen.getByRole('combobox', { name: /language/i });
		expect(selectElement).toHaveTextContent('English');

		// Update mock to Spanish
		jest.resetModules();
		jest.mock('react-i18next', () => ({
			useTranslation: () => ({
				t: (key) => {
					const translations = {
						'languageSelector.language': 'Idioma',
						'languageSelector.english': 'Inglés',
						'languageSelector.spanish': 'Español',
					};
					return translations[key] || key;
				},
				i18n: {
					language: 'es',
					changeLanguage: jest.fn(),
				},
			}),
		}));

		// Rerender and check Spanish is selected
		rerender(
			<ThemeProvider theme={createTheme()}>
				<LanguageSelector />
			</ThemeProvider>
		);
		selectElement = screen.getByRole('combobox', { name: /language/i });
		expect(selectElement).toHaveTextContent('Spanish');
	});
});
