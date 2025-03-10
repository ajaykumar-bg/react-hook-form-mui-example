import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import './App.css';
import './i18n/i18n'; // Import i18n initialization
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
		;
	</React.StrictMode>
);
