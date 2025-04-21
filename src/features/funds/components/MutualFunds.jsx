import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';

import {
	fetchMutualFundsRequest,
	selectMutualFunds,
} from '../redux/mutualFundsSlice';

function MutualFunds() {
	const [selectedFund, setSelectedFund] = useState();
	const dispatch = useDispatch();
	const mutualFunds = useSelector(selectMutualFunds);

	useEffect(() => {
		dispatch(fetchMutualFundsRequest());
	}, [dispatch]);

	const handleChange = (event, newValue) => {
		setSelectedFund(newValue);
	};

	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Mutual Funds
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				Search and find a mutual Fund
			</Typography>
			<Box>
				<Autocomplete
					value={selectedFund}
					onChange={handleChange}
					options={mutualFunds}
					getOptionLabel={(option) => option.schemeName}
					getOptionKey={(option) => option.schemeCode}
					sx={{ width: 'auto' }}
					renderInput={(params) => (
						<TextField {...params} label='Mutual Funds' />
					)}
					renderOption={(props, option) => (
						<li {...props} key={option.schemeCode}>
							{option.schemeName}
						</li>
					)}
				/>
			</Box>
		</Box>
	);
}

export default MutualFunds;
