import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
	Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import {
	difficulties,
	equipments,
	// exercisesData,
	muscles,
} from '../constants/exercisesApp.mock';
import exercisesData from '../constants/exercises.json';
import Exercise from './Exercise';
import ExerciseDetail from './ExerciseDetail';

// Main App Component
const ExerciseApp = () => {
	const [exercises, setExercises] = useState(exercisesData?.exercises);
	const [filters, setFilters] = useState({
		muscle: '',
		equipment: '',
		difficulty: '',
		searchQuery: '',
	});
	const [selectedExercise, setSelectedExercise] = useState(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);

	// Handle filter changes
	const handleFilterChange = (event) => {
		const { name, value } = event.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	// Handle search
	const handleSearch = (event) => {
		setFilters({
			...filters,
			searchQuery: event.target.value,
		});
	};

	// Apply filters
	useEffect(() => {
		let filteredExercises = [...exercisesData?.exercises];

		// Filter by muscle
		if (filters.muscle && filters.muscle !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.muscle === filters.muscle
			);
		}

		// Filter by equipment
		if (filters.equipment && filters.equipment !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.equipment === filters.equipment
			);
		}

		// Filter by difficulty
		if (filters.difficulty && filters.difficulty !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.difficulty === filters.difficulty
			);
		}

		// Filter by search query
		if (filters.searchQuery) {
			filteredExercises = filteredExercises.filter((exercise) =>
				exercise.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
			);
		}

		setExercises(filteredExercises);
	}, [filters]);

	// Open exercise details
	const openExerciseDetails = (exercise) => {
		setSelectedExercise(exercise);
		setDetailsOpen(true);
		setActiveStep(0);
	};

	// Close exercise details
	const closeExerciseDetails = () => {
		setDetailsOpen(false);
		setSelectedExercise(null);
	};

	// Handle image navigation
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography
				variant='h3'
				component='h1'
				gutterBottom
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<FitnessCenterIcon sx={{ mr: 2, fontSize: 40 }} />
				Gym Exercise Library
			</Typography>

			{/* Filters Section */}
			<Paper elevation={3} sx={{ p: 3, mb: 4 }}>
				<Typography variant='h5' component='h2' gutterBottom>
					Filters
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<TextField
							fullWidth
							label='Search Exercises'
							variant='outlined'
							name='searchQuery'
							value={filters.searchQuery}
							onChange={handleSearch}
							InputProps={{
								endAdornment: <SearchIcon position='end' />,
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<FormControl fullWidth>
							<InputLabel id='muscle-label'>Muscle Group</InputLabel>
							<Select
								labelId='muscle-label'
								id='muscle-select'
								name='muscle'
								value={filters.muscle}
								label='Muscle Group'
								onChange={handleFilterChange}
							>
								{muscles.map((muscle) => (
									<MenuItem key={muscle} value={muscle}>
										{muscle}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<FormControl fullWidth>
							<InputLabel id='equipment-label'>Equipment</InputLabel>
							<Select
								labelId='equipment-label'
								id='equipment-select'
								name='equipment'
								value={filters.equipment}
								label='Equipment'
								onChange={handleFilterChange}
							>
								{equipments.map((item) => (
									<MenuItem key={item} value={item}>
										{item}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<FormControl fullWidth>
							<InputLabel id='difficulty-label'>Difficulty</InputLabel>
							<Select
								labelId='difficulty-label'
								id='difficulty-select'
								name='difficulty'
								value={filters.difficulty}
								label='Difficulty'
								onChange={handleFilterChange}
							>
								{difficulties.map((difficulty) => (
									<MenuItem key={difficulty} value={difficulty}>
										{difficulty}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>

			{/* Exercise Cards */}
			<Grid container spacing={3}>
				{exercises.length > 0 ? (
					exercises.map((exercise) => (
						<Exercise
							key={exercise.name}
							exercise={exercise}
							onOpenDetails={openExerciseDetails}
						/>
					))
				) : (
					<Grid item xs={12}>
						<Paper sx={{ p: 3, textAlign: 'center' }}>
							<Typography variant='h6'>
								No exercises found matching your filters.
							</Typography>
							<Button
								variant='outlined'
								sx={{ mt: 2 }}
								onClick={() =>
									setFilters({
										muscle: '',
										equipment: '',
										difficulty: '',
										searchQuery: '',
									})
								}
							>
								Clear Filters
							</Button>
						</Paper>
					</Grid>
				)}
			</Grid>

			<ExerciseDetail
				selectedExercise={selectedExercise}
				open={detailsOpen}
				onClose={closeExerciseDetails}
				activeStep={activeStep}
				handleNext={handleNext}
				handleBack={handleBack}
			/>
		</Container>
	);
};

export default ExerciseApp;
