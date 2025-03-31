import React, { useMemo } from 'react';
import {
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Chip,
	Button,
} from '@mui/material';

function Exercise(props) {
	const { exercise, onOpenDetails } = props;
	const images = useMemo(() => {
		let name = exercise?.name?.replace(/ /g, '_');
		name = name?.replace('/', '_');
		const imagePath1 = `/exercises-data/${name}/images/0.jpg`;
		const imagePath2 = `/exercises-data/${name}/images/1.jpg`;
		return [imagePath1, imagePath2];
	}, [exercise?.name]);

	return (
		<Grid item xs={12} sm={6} md={4} key={exercise.name}>
			<Card
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					transition: 'transform 0.2s, box-shadow 0.2s',
					'&:hover': {
						transform: 'translateY(-5px)',
						boxShadow: 6,
					},
				}}
			>
				<CardMedia
					component='img'
					height='200'
					image={images[0]}
					alt={exercise.name}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant='h5' component='h2'>
						{exercise.name}
					</Typography>
					<Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
						<Chip
							label={exercise.primaryMuscles[0]}
							color='primary'
							size='small'
						/>
						<Chip label={exercise.equipment} color='secondary' size='small' />
						<Chip label={exercise.level} color='default' size='small' />

						<Chip label={exercise.category} color='error' size='small' />
						<Chip label={exercise.force} color='info' size='small' />
						<Chip label={exercise.mechanic} color='success' size='small' />
					</Box>
					<Typography variant='body2' color='text.secondary'>
						{exercise.description?.substring(0, 120)}...
					</Typography>
				</CardContent>
				<Box sx={{ p: 2, pt: 0 }}>
					<Button
						variant='contained'
						fullWidth
						onClick={() => onOpenDetails(exercise)}
					>
						View Details
					</Button>
				</Box>
			</Card>
		</Grid>
	);
}

export default Exercise;
