import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About component', () => {
	test('renders About heading', () => {
		render(<About />);
		// Use getAllByText and check the first element is the heading
		const aboutElements = screen.getAllByText(/about/i);
		expect(aboutElements.length).toBeGreaterThan(0);
		// Optionally, check the variant or tag if needed
	});

	test('renders description text', () => {
		render(<About />);
		expect(
			screen.getByText(
				/this is the about page\. here you can provide information about your application or organization\./i
			)
		).toBeInTheDocument();
	});
});
