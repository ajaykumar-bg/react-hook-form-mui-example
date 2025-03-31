import React, { useMemo } from 'react';
import {
	Typography,
	Box,
	Chip,
	Button,
	Drawer,
	Tooltip,
	IconButton,
	AppBar,
	Toolbar,
	Divider,
	MobileStepper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function ExerciseDetail(props) {
	const {
		selectedExercise,
		open,
		onClose,
		activeStep,
		handleNext,
		handleBack,
	} = props;
	const images = useMemo(() => {
		let name = selectedExercise?.name.replace(/ /g, '_');
		name = name?.replace('/', '_');
		const imagePath1 = `/exercises-data/${name}/images/0.jpg`;
		const imagePath2 = `/exercises-data/${name}/images/1.jpg`;
		return [imagePath1, imagePath2];
	}, [selectedExercise?.name]);
	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={onClose}
			sx={{
				'& .MuiDrawer-paper': {
					width: { xs: '100%', sm: '80%', md: '60%' },
					maxWidth: '800px',
					p: 0,
				},
			}}
		>
			{selectedExercise && (
				<>
					<AppBar position='sticky' color='default' elevation={0}>
						<Toolbar>
							<Typography variant='h6' sx={{ flexGrow: 1 }}>
								{selectedExercise.name}
							</Typography>
							<IconButton
								edge='end'
								color='inherit'
								onClick={onClose}
								aria-label='close'
							>
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar>

					<Box sx={{ position: 'relative', width: '100%' }}>
						<Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
							<Box
								component='img'
								loading='lazy'
								sx={{
									height: 300,
									display: 'block',
									width: '100%',
									objectFit: 'cover',
								}}
								src={images[activeStep]}
								alt={`${selectedExercise.name} - image ${activeStep + 1}`}
							/>
							<MobileStepper
								variant='dots'
								steps={images.length}
								position='static'
								activeStep={activeStep}
								sx={{ flexGrow: 1 }}
								nextButton={
									<Button
										size='small'
										onClick={handleNext}
										disabled={activeStep === images.length - 1}
									>
										Next
										<KeyboardArrowRight />
									</Button>
								}
								backButton={
									<Button
										size='small'
										onClick={handleBack}
										disabled={activeStep === 0}
									>
										<KeyboardArrowLeft />
										Back
									</Button>
								}
							/>
						</Box>
					</Box>

					<Box sx={{ p: 3 }}>
						<Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
							<Tooltip
								title={`Muscle Groups involved: ${selectedExercise.primaryMuscles.join(
									','
								)}`}
							>
								<Chip
									label={selectedExercise.primaryMuscles[0]}
									color='primary'
								/>
							</Tooltip>
							<Tooltip title='Equipment used'>
								<Chip
									label={selectedExercise.equipment || '-'}
									color='secondary'
								/>
							</Tooltip>

							<Tooltip title='Level'>
								<Chip label={selectedExercise.level} />
							</Tooltip>

							<Tooltip title='Category'>
								<Chip
									label={selectedExercise.category}
									color='error'
									size='small'
								/>
							</Tooltip>

							<Tooltip title='Force'>
								<Chip
									label={selectedExercise.force || '-'}
									color='info'
									size='small'
								/>
							</Tooltip>
							<Tooltip title='Mechanic'>
								<Chip
									label={selectedExercise.mechanic || '-'}
									color='success'
									size='small'
								/>
							</Tooltip>
						</Box>

						<Typography variant='h6' gutterBottom>
							Description
						</Typography>
						<Typography paragraph>{selectedExercise.description}</Typography>

						<Divider sx={{ my: 2 }} />

						<Typography variant='h6' gutterBottom>
							Instructions
						</Typography>
						{selectedExercise.instructions.map((step, index) => (
							<Box key={index} sx={{ display: 'flex', mb: 1 }}>
								<Typography
									variant='body1'
									component='span'
									sx={{ mr: 1, fontWeight: 'bold' }}
								>
									{index + 1}.
								</Typography>
								<Typography variant='body1'>{step}</Typography>
							</Box>
						))}

						<Button
							variant='contained'
							color='primary'
							size='large'
							sx={{ mt: 4 }}
							fullWidth
						>
							Add to Workout
						</Button>
					</Box>
				</>
			)}
		</Drawer>
	);
}

export default ExerciseDetail;
