import React from 'react';
import LanguageSelector from './LanguageSelector';
import { Box, Typography, Divider } from '@mui/material';

function Settings() {
	return (
		<div>
			<p>
				This is the settings page. Here users can configure various options for
				your application.
			</p>
			<Divider />
			<Box sx={{ my: 3 }}>
				<Typography>Update your language here</Typography>
				<Box sx={{ mt: 2 }}>
					<LanguageSelector />
				</Box>
			</Box>
			<Divider />
		</div>
	);
}

export default Settings;
