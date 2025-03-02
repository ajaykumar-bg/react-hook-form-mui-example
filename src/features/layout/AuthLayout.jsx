import React from 'react';
import { Grid } from '@mui/material';

function AuthLayout(props) {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justify='center'
			style={{ minHeight: '100vh', marginTop: '15vh' }}
		>
			<Grid item xs={3}>
				{props.children}
			</Grid>
		</Grid>
	);
}

export default AuthLayout;
