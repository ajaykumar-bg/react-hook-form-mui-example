import React, { useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Paper,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Card,
	CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { MOCK_FUNDS_V1 } from '../data/mockFunds';

// Styled components using MUI's styled API
const SummaryCard = styled(Card)(({ theme, colortype }) => ({
	height: '100%',
	backgroundColor:
		colortype === 'primary'
			? theme.palette.primary.light
			: colortype === 'success'
			? theme.palette.success.light
			: theme.palette.secondary.light,
	'& .MuiTypography-subtitle1': {
		color: theme.palette.text.secondary,
	},
	'& .MuiTypography-h4': {
		color:
			colortype === 'primary'
				? theme.palette.primary.dark
				: colortype === 'success'
				? theme.palette.success.dark
				: theme.palette.secondary.dark,
	},
}));

export default function InvestmentPortfolioTrackerV1() {
	// Sample data - replace with your actual investment data
	const [funds, setFunds] = useState(MOCK_FUNDS_V1);

	// Toggle fund visibility
	const toggleFundVisibility = (dataKey) => {
		setFunds((prevFunds) =>
			prevFunds.map((fund) =>
				fund.schemeName === dataKey ? { ...fund, visible: !fund.visible } : fund
			)
		);
	};

	// Prepare data for the overall performance chart
	const combinedMonthlyData = funds[0].monthlyReturns.map((monthData) => {
		const obj = { month: monthData.month };

		funds.forEach((fund) => {
			const monthReturn = fund.monthlyReturns.find(
				(m) => m.month === monthData.month
			);
			obj[fund.schemeName] = monthReturn ? monthReturn.value : 0;
		});

		return obj;
	});

	// Calculate total portfolio value by month
	const portfolioValueByMonth = funds[0].monthlyReturns.map((monthData) => {
		const totalValue = funds.reduce((sum, fund) => {
			const monthReturn = fund.monthlyReturns.find(
				(m) => m.month === monthData.month
			);
			return sum + (monthReturn ? monthReturn.value : 0);
		}, 0);

		return {
			month: monthData.month,
			value: totalValue,
		};
	});

	// Calculate current total portfolio value
	const totalCurrentValue = funds.reduce((sum, fund) => {
		const currentValue =
			fund.monthlyReturns[fund.monthlyReturns.length - 1].value;
		return sum + currentValue;
	}, 0);

	// Calculate total initial investment
	const totalInitialInvestment = funds.reduce((sum, fund) => {
		return sum + fund.initialInvestment;
	}, 0);

	// Calculate total return percentage
	const totalReturnPercentage = (
		((totalCurrentValue - totalInitialInvestment) / totalInitialInvestment) *
		100
	).toFixed(2);

	// Generate chart colors
	const colors = ['#3f51b5', '#4caf50', '#ff9800', '#f50057'];

	// Format currency
	const formatCurrency = (value) => {
		return `Rs. ${value.toLocaleString()}`;
	};

	// Custom Legend component for toggling visibility
	const CustomizedLegend = (props) => {
		const { payload } = props;

		return (
			<ul
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					listStyle: 'none',
					padding: 0,
					margin: 0,
				}}
			>
				{payload.map((entry, index) => {
					const fund = funds.find((f) => f.schemeName === entry.value);
					const isActive = fund ? fund.visible : true;

					return (
						<li
							key={`item-${index}`}
							style={{
								marginRight: 20,
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
								opacity: isActive ? 1 : 0.5,
							}}
							onClick={() => toggleFundVisibility(entry.value)}
						>
							<div
								style={{
									width: 10,
									height: 10,
									backgroundColor: entry.color,
									marginRight: 5,
								}}
							/>
							<span>{entry.value}</span>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
			<Typography
				variant='h4'
				component='h1'
				gutterBottom
				align='center'
				color='primary'
			>
				Investment Portfolio Tracker
			</Typography>

			{/* Summary Cards */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} md={4}>
					<SummaryCard colortype='primary'>
						<CardContent>
							<Typography
								variant='subtitle1'
								component='div'
								gutterBottom
								align='center'
							>
								Total Investment
							</Typography>
							<Typography variant='h4' component='div' align='center'>
								{formatCurrency(totalInitialInvestment)}
							</Typography>
						</CardContent>
					</SummaryCard>
				</Grid>
				<Grid item xs={12} md={4}>
					<SummaryCard colortype='success'>
						<CardContent>
							<Typography
								variant='subtitle1'
								component='div'
								gutterBottom
								align='center'
							>
								Current Value
							</Typography>
							<Typography variant='h4' component='div' align='center'>
								{formatCurrency(totalCurrentValue)}
							</Typography>
						</CardContent>
					</SummaryCard>
				</Grid>
				<Grid item xs={12} md={4}>
					<SummaryCard colortype='secondary'>
						<CardContent>
							<Typography
								variant='subtitle1'
								component='div'
								gutterBottom
								align='center'
							>
								Total Return
							</Typography>
							<Typography variant='h4' component='div' align='center'>
								{totalReturnPercentage}%
							</Typography>
						</CardContent>
					</SummaryCard>
				</Grid>
			</Grid>

			{/* Portfolio Value Chart */}
			<Paper elevation={2} sx={{ p: 3, mb: 4 }}>
				<Typography variant='h6' component='h2' gutterBottom>
					Portfolio Growth
				</Typography>
				<Box sx={{ height: 300 }}>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart data={portfolioValueByMonth}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='month' />
							<YAxis />
							<Tooltip
								formatter={(value) => [
									formatCurrency(value),
									'Portfolio Value',
								]}
							/>
							<Legend />
							<Line
								type='monotone'
								dataKey='value'
								stroke='#1976d2'
								strokeWidth={2}
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</Box>
			</Paper>

			{/* Individual Funds Chart */}
			<Paper elevation={2} sx={{ p: 3, mb: 4 }}>
				<Typography variant='h6' component='h2' gutterBottom>
					Individual Fund Performance
				</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
					Click on the legend items below to toggle fund visibility
				</Typography>
				<Box sx={{ height: 700 }}>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={combinedMonthlyData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='month' />
							<YAxis />
							<Tooltip formatter={(value) => [formatCurrency(value)]} />
							<Legend content={<CustomizedLegend />} />
							{funds
								.filter((fund) => fund.visible)
								.map((fund, index) => (
									<Bar
										key={fund.id}
										dataKey={fund.schemeName}
										fill={colors[index % colors.length]}
									/>
								))}
						</BarChart>
					</ResponsiveContainer>
				</Box>
			</Paper>

			{/* Fund Details Table */}
			<Paper elevation={2} sx={{ p: 3 }}>
				<Typography variant='h6' component='h2' gutterBottom>
					Fund Details
				</Typography>
				<TableContainer>
					<Table aria-label='fund details table'>
						<TableHead>
							<TableRow>
								<TableCell>Scheme Name</TableCell>
								<TableCell align='right'>Initial Investment</TableCell>
								<TableCell align='right'>Current Value</TableCell>
								<TableCell align='right'>Return Value</TableCell>
								<TableCell align='right'>Return %</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{funds.map((fund) => {
								const currentValue =
									fund.monthlyReturns[fund.monthlyReturns.length - 1].value;
								const returnValue = currentValue - fund.initialInvestment;
								const returnPercentage = (
									((currentValue - fund.initialInvestment) /
										fund.initialInvestment) *
									100
								).toFixed(2);
								const isPositiveReturn = parseFloat(returnPercentage) >= 0;

								return (
									<TableRow
										key={fund.id}
										sx={{
											opacity: fund.visible ? 1 : 0.5,
											backgroundColor: fund.visible
												? 'inherit'
												: 'rgba(0, 0, 0, 0.04)',
										}}
									>
										<TableCell component='th' scope='row'>
											{fund.schemeName}
										</TableCell>
										<TableCell align='right'>
											{formatCurrency(fund.initialInvestment)}
										</TableCell>
										<TableCell align='right'>
											{formatCurrency(currentValue)}
										</TableCell>
										<TableCell
											align='right'
											sx={{
												color: isPositiveReturn ? 'success.main' : 'error.main',
												fontWeight: 'bold',
											}}
										>
											{formatCurrency(returnValue)}
										</TableCell>
										<TableCell
											align='right'
											sx={{
												color: isPositiveReturn ? 'success.main' : 'error.main',
												fontWeight: 'bold',
											}}
										>
											{returnPercentage}%
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
}
