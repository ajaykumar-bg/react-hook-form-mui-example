import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Heatmap } from '@mui/x-charts-pro/Heatmap';

const data = [
	[0, 0, 10],
	[0, 1, 20],
	[0, 2, 40],
	[0, 3, 90],
	[0, 4, 70],
	[1, 0, 30],
	[1, 1, 50],
	[1, 2, 10],
	[1, 3, 70],
	[1, 4, 40],
	[2, 0, 50],
	[2, 1, 20],
	[2, 2, 90],
	[2, 3, 20],
	[2, 4, 70],
	[3, 0, 40],
	[3, 1, 50],
	[3, 2, 20],
	[3, 3, 70],
	[3, 4, 90],
];

function BasicHeatmapChart() {
	return (
		<Card variant='outlined' sx={{ width: '100%' }}>
			<CardContent>
				<Typography component='h2' variant='subtitle2' gutterBottom>
					Basic Heatmap
				</Typography>
				<Box sx={{ width: '100%', maxWidth: 400 }}>
					<Heatmap
						xAxis={[{ data: [1, 2, 3, 4] }]}
						yAxis={[{ data: ['A', 'B', 'C', 'D', 'E'] }]}
						series={[{ data }]}
						margin={{ top: 5, right: 5, left: 20 }}
						height={300}
					/>
				</Box>
			</CardContent>
		</Card>
	);
}

export default BasicHeatmapChart;
