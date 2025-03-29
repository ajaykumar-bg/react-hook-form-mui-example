import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

function BasicBarChart() {
	return (
		<Card variant='outlined' sx={{ width: '100%' }}>
			<CardContent>
				<Typography component='h2' variant='subtitle2' gutterBottom>
					Basic Bar Chart
				</Typography>
				<BarChart
					xAxis={[
						{
							scaleType: 'band',
							data: ['group A', 'group B', 'group C', 'group D', 'group E'],
						},
					]}
					series={[
						{ data: [4, 3, 5, 6, 2] },
						{ data: [1, 6, 3, 5, 2] },
						{ data: [2, 5, 6, 3, 4] },
					]}
					width={500}
					height={300}
				/>
			</CardContent>
		</Card>
	);
}

export default BasicBarChart;
