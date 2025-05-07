import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import {
	// fetchMutualFundsRequest,
	fetchMutualFundRequest,
	selectMutualFunds,
	selectMutualFundForEdit,
	selectSelectedMutualFund,
} from '../redux/mutualFundsSlice';
import MutualFundList from './MutualFundList';
import SelectedFundDetails from './SelectedFundDetails';

function MutualFunds() {
	const dispatch = useDispatch();
	const mutualFunds = useSelector(selectMutualFunds);

	const selectedMutualFund = useSelector(selectSelectedMutualFund);
	console.log('selectedMutualFund', selectedMutualFund);

	useEffect(() => {
		// dispatch(fetchMutualFundsRequest());
	}, [dispatch]);

	const handleFundSelect = (fund) => {
		dispatch(selectMutualFundForEdit(fund));
		dispatch(fetchMutualFundRequest(fund.schemeCode));
	};

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: { sm: '100%', md: '1700px' },
			}}
		>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Mutual Funds
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				Click on a mutual Fund to see details
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={4}>
					<MutualFundList
						funds={mutualFunds}
						selectedMutualFund={selectedMutualFund}
						handleSelect={handleFundSelect}
					/>
				</Grid>
				<Grid item xs={12} sm={8} md={8}>
					{selectedMutualFund && (
						<SelectedFundDetails fund={selectedMutualFund} />
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default MutualFunds;
