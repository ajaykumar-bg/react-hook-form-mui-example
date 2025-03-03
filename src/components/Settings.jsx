import React from 'react';
import LanguageSelector from './LanguageSelector';
import { Box, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';

function Settings() {
	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Settings
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				This is the settings page. Here users can configure various options for
				your application.
			</Typography>
			<Divider />
			<Box sx={{ my: 3 }}>
				<Grid container spacing={2}>
					<Grid item>
						<Typography>Update your language here</Typography>
					</Grid>
					<Grid item>
						<LanguageSelector />
					</Grid>
				</Grid>
			</Box>
			<Divider />
		</Box>
	);
}

export default Settings;
