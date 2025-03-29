import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import BasicBarChart from './BasicBarChart';
import BasicPieChart from './BasicPieChart';
import BasicLineChart from './BasicLineChart';
import BasicScatterChart from './BasicScatterChart';
import BasicHeatmapChart from './BasicHeatMapChart';

function DashboardCharts() {
	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			{/* cards */}
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Mui Charts
			</Typography>
			<Grid
				container
				spacing={2}
				columns={12}
				sx={{ mb: (theme) => theme.spacing(2) }}
			>
				<Grid size={{ xs: 12, md: 6 }}>
					<BasicBarChart />
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<BasicPieChart />
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<BasicLineChart />
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<BasicScatterChart />
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<BasicHeatmapChart />
				</Grid>
			</Grid>
		</Box>
	);
}

export default DashboardCharts;
