import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import TransferList from './TransferList';

function TransferListDemo() {
	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				TransferList
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				This is the TransferList page.
			</Typography>
			<Divider />
			<Box sx={{ my: 3 }}>
				<TransferList />
			</Box>
			<Divider />
		</Box>
	);
}

export default TransferListDemo;
