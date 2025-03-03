import React from 'react';
import { Box, Typography } from '@mui/material';

function Contact() {
	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Contact
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				This is the contact page. Here you can provide contact information or a
				form.
			</Typography>
		</Box>
	);
}

export default Contact;
