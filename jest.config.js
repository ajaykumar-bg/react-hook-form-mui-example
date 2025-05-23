module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/components/$1',
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testMatch: ['**/*.test.js'],
};
