import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Box,
	IconButton,
	Typography,
	Divider,
} from '@mui/material';
import { orange, red, green } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function SelectedFundDetails(props) {
	const { fund } = props;
	const { data = [] } = fund;
	const xAxisData = data.map((item) => item.date);
	const yAxisData = data.map((item) => item.nav);

	return (
		<Card
			sx={{
				height: 900,
				display: 'flex',
				flexDirection: 'column',
				transition: 'transform 0.2s, box-shadow 0.2s',
				'&:hover': {
					transform: 'translateY(-5px)',
					boxShadow: 6,
				},
			}}
		>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
						{fund.schemeName.charAt(0).toUpperCase()}
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={fund.schemeName}
				subheader={fund.schemeCode}
			/>
			<CardContent>
				{data.length > 0 && (
					<Box>
						<Divider />
						<Typography>First Date: {data[0].date}</Typography>
						<Typography sx={{ color: orange[500] }}>
							First Price: {data[0].nav}
						</Typography>
						<Typography>Last Date: {data[data.length - 1].date}</Typography>
						<Typography sx={{ color: green[500] }}>
							Last Price: {data[data.length - 1].nav}
						</Typography>
					</Box>
				)}

				<Box sx={{ width: '100%', height: 700 }}>
					<SparkLineChart
						data={yAxisData}
						area
						showHighlight
						showTooltip
						xAxis={{
							scaleType: 'band',
							data: xAxisData, // Use the correct property 'data' for xAxis
						}}
					>
						{/* <AreaGradient color={chartColor} id={`area-gradient-${value}`} /> */}
					</SparkLineChart>
				</Box>
			</CardContent>
		</Card>
	);
}

export default SelectedFundDetails;
