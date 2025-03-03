import React from 'react';
import { Box, Typography } from '@mui/material';

function About() {
	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				About
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				This is the about page. Here you can provide information about your
				application or organization.
			</Typography>
		</Box>
	);
}

export default About;
