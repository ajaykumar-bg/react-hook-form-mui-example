// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	useTranslation: () => {
		return {
			t: (str) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		};
	},
	initReactI18next: {
		type: '3rdParty',
		init: () => {},
	},
}));

// Mock the fetch API
global.fetch = require('jest-fetch-mock');

// Mock the TextEncoder
global.TextEncoder = require('util').TextEncoder;

beforeEach(() => {
	fetch.resetMocks();
});

// Mock for React Router's useNavigate
jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useNavigate: () => jest.fn(),
}));

// Add custom matchers if needed
/*
expect.extend({
	toBeInRange(received, floor, ceiling) {
		const pass = received >= floor && received <= ceiling;
		if (pass) {
			return {
				message: () =>
					`expected ${received} not to be within range ${floor} - ${ceiling}`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`expected ${received} to be within range ${floor} - ${ceiling}`,
				pass: false,
			};
		}
	},
});
*/

// Mock localStorage
const localStorageMock = (() => {
	let store = {};
	return {
		getItem: jest.fn((key) => store[key] || null),
		setItem: jest.fn((key, value) => {
			store[key] = value.toString();
		}),
		removeItem: jest.fn((key) => {
			delete store[key];
		}),
		clear: jest.fn(() => {
			store = {};
		}),
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

// Mock for ResizeObserver which is often not available in Jest environment
// global.ResizeObserver = jest.fn().mockImplementation(() => ({
// 	observe: jest.fn(),
// 	unobserve: jest.fn(),
// 	disconnect: jest.fn(),
// }));
