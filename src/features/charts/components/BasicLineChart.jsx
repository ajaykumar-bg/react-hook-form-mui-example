import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

function BasicLineChart() {
	return (
		<Card variant='outlined' sx={{ width: '100%' }}>
			<CardContent>
				<Typography component='h2' variant='subtitle2' gutterBottom>
					Basic Line Chart
				</Typography>
				<LineChart
					xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
					series={[
						{
							data: [2, 5.5, 2, 8.5, 1.5, 5],
						},
					]}
					width={500}
					height={300}
				/>
			</CardContent>
		</Card>
	);
}

export default BasicLineChart;
