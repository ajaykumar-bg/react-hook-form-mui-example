import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';

function BasicPieChart() {
	return (
		<Card variant='outlined' sx={{ width: '100%' }}>
			<CardContent>
				<Typography component='h2' variant='subtitle2' gutterBottom>
					Basic Pie Chart
				</Typography>
				<PieChart
					colors={['red', 'yellow', 'teal']}
					series={[
						{
							data: [
								{ id: 0, value: 10, label: 'China' },
								{ id: 1, value: 15, label: 'Brazil' },
								{ id: 2, value: 20, label: 'Pakistan' },
							],
						},
					]}
					width={400}
					height={200}
				/>
			</CardContent>
		</Card>
	);
}

export default BasicPieChart;
