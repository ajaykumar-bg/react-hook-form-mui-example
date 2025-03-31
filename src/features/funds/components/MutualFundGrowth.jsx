import React, { useState } from 'react';
import {
	Box,
	Typography,
	Paper,
	ToggleButton,
	ToggleButtonGroup,
	useTheme,
	Grid,
	Divider,
} from '@mui/material';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const MutualFundGrowthChart = () => {
	const theme = useTheme();

	// Sample data for multiple mutual funds over time
	const [data] = useState([
		{
			month: 'Jan',
			'Growth Fund': 10.2,
			'Value Fund': 8.5,
			'Index Fund': 9.1,
			'Bond Fund': 4.2,
		},
		{
			month: 'Feb',
			'Growth Fund': 11.5,
			'Value Fund': 9.2,
			'Index Fund': 9.8,
			'Bond Fund': 4.3,
		},
		{
			month: 'Mar',
			'Growth Fund': 10.8,
			'Value Fund': 9.6,
			'Index Fund': 10.2,
			'Bond Fund': 4.5,
		},
		{
			month: 'Apr',
			'Growth Fund': 12.3,
			'Value Fund': 10.1,
			'Index Fund': 10.9,
			'Bond Fund': 4.6,
		},
		{
			month: 'May',
			'Growth Fund': 13.4,
			'Value Fund': 10.8,
			'Index Fund': 11.5,
			'Bond Fund': 4.8,
		},
		{
			month: 'Jun',
			'Growth Fund': 14.2,
			'Value Fund': 11.3,
			'Index Fund': 12.0,
			'Bond Fund': 5.0,
		},
		{
			month: 'Jul',
			'Growth Fund': 15.5,
			'Value Fund': 11.9,
			'Index Fund': 12.6,
			'Bond Fund': 5.1,
		},
		{
			month: 'Aug',
			'Growth Fund': 16.8,
			'Value Fund': 12.4,
			'Index Fund': 13.1,
			'Bond Fund': 5.3,
		},
		{
			month: 'Sep',
			'Growth Fund': 17.6,
			'Value Fund': 13.0,
			'Index Fund': 13.8,
			'Bond Fund': 5.4,
		},
		{
			month: 'Oct',
			'Growth Fund': 18.9,
			'Value Fund': 13.7,
			'Index Fund': 14.5,
			'Bond Fund': 5.6,
		},
		{
			month: 'Nov',
			'Growth Fund': 20.1,
			'Value Fund': 14.2,
			'Index Fund': 15.1,
			'Bond Fund': 5.7,
		},
		{
			month: 'Dec',
			'Growth Fund': 21.5,
			'Value Fund': 15.0,
			'Index Fund': 15.8,
			'Bond Fund': 5.9,
		},
	]);

	const funds = [
		{ name: 'Growth Fund', color: theme.palette.primary.main },
		{ name: 'Value Fund', color: theme.palette.secondary.main },
		{ name: 'Index Fund', color: theme.palette.success.main },
		{ name: 'Bond Fund', color: theme.palette.warning.main },
	];

	const [selectedFunds, setSelectedFunds] = useState(
		funds.map((fund) => fund.name)
	);

	const handleFundToggle = (event, newSelectedFunds) => {
		// Ensure at least one fund is selected
		if (newSelectedFunds.length) {
			setSelectedFunds(newSelectedFunds);
		}
	};

	// Calculate growth percentage for each fund
	const calculateGrowth = (fundName) => {
		const firstMonth = data[0][fundName];
		const lastMonth = data[data.length - 1][fundName];
		return (((lastMonth - firstMonth) / firstMonth) * 100).toFixed(1);
	};

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<Paper
					elevation={3}
					sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
				>
					<Typography variant='subtitle2' color='textSecondary'>
						{label}
					</Typography>
					{payload.map((entry, index) => (
						<Box
							key={`tooltip-${index}`}
							sx={{ display: 'flex', alignItems: 'center', my: 0.5 }}
						>
							<Box
								component='span'
								sx={{
									width: 12,
									height: 12,
									backgroundColor: entry.color,
									mr: 1,
									borderRadius: '50%',
								}}
							/>
							<Typography variant='body2' color='textPrimary'>
								{entry.name}: ${entry.value}
							</Typography>
						</Box>
					))}
				</Paper>
			);
		}
		return null;
	};

	return (
		<Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
			<Typography variant='h5' component='h2' gutterBottom>
				Mutual Fund Growth Performance
			</Typography>

			<Box sx={{ mb: 3 }}>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					Select funds to display:
				</Typography>
				<ToggleButtonGroup
					value={selectedFunds}
					onChange={handleFundToggle}
					aria-label='selected funds'
					size='small'
					color='primary'
				>
					{funds.map((fund) => (
						<ToggleButton
							key={fund.name}
							value={fund.name}
							aria-label={fund.name}
							sx={{
								px: 2,
								'&.Mui-selected': {
									backgroundColor: `${fund.color}30`,
									borderColor: fund.color,
									color: fund.color,
								},
							}}
						>
							{fund.name}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Box>

			<Box sx={{ height: 400, width: '100%' }}>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='month' />
						<YAxis
							label={{
								value: 'NAV Value ($)',
								angle: -90,
								position: 'insideLeft',
								style: { textAnchor: 'middle' },
							}}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend />

						{funds.map(
							(fund) =>
								selectedFunds.includes(fund.name) && (
									<Line
										key={fund.name}
										type='monotone'
										dataKey={fund.name}
										stroke={fund.color}
										activeDot={{ r: 8 }}
										strokeWidth={2}
									/>
								)
						)}
					</LineChart>
				</ResponsiveContainer>
			</Box>

			<Divider sx={{ my: 3 }} />

			<Box>
				<Typography variant='h6' gutterBottom>
					Fund Performance Summary
				</Typography>
				<Grid container spacing={2}>
					{funds.map(
						(fund) =>
							selectedFunds.includes(fund.name) && (
								<Grid item xs={12} sm={6} md={3} key={fund.name}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Box
											component='span'
											sx={{
												width: 12,
												height: 12,
												backgroundColor: fund.color,
												mr: 1,
												borderRadius: '50%',
											}}
										/>
										<Typography variant='body2'>{fund.name}</Typography>
									</Box>
									<Typography variant='h6' sx={{ color: fund.color }}>
										{calculateGrowth(fund.name)}%
									</Typography>
									<Typography variant='caption' color='textSecondary'>
										Annual Growth
									</Typography>
								</Grid>
							)
					)}
				</Grid>
			</Box>
		</Paper>
	);
};

export default MutualFundGrowthChart;
