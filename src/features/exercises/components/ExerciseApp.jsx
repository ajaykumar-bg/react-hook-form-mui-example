import React, { useState, useEffect } from 'react';
import { AppBar, Box, Typography } from '@mui/material';

import exercisesData from '../constants/exercises.json';

import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';

// Main App Component
const ExerciseApp = () => {
	const [exercises, setExercises] = useState(exercisesData?.exercises);
	const [filters, setFilters] = useState({
		searchQuery: '',
		muscle: 'All',
		equipment: 'All',
		category: 'All',
		force: 'All',
		difficulty: 'All',
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

	const clearFilters = () => {
		setFilters({
			searchQuery: '',
			muscle: 'All',
			equipment: 'All',
			category: 'All',
			force: 'All',
			difficulty: 'All',
		});
	};

	const applyFilters = () => {
		let filteredExercises = [...exercisesData?.exercises];

		// Filter by muscle
		if (filters.muscle && filters.muscle !== 'All') {
			filteredExercises = filteredExercises.filter((exercise) =>
				exercise.primaryMuscles.includes(filters.muscle)
			);
		}

		// Filter by equipment
		if (filters.equipment && filters.equipment !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.equipment === filters.equipment
			);
		}

		// Filter by force
		if (filters.force && filters.force !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.force === filters.force
			);
		}

		// Filter by difficulty
		if (filters.difficulty && filters.difficulty !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.level === filters.difficulty
			);
		}

		// Filter by category
		if (filters.category && filters.category !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.category === filters.category
			);
		}

		// Filter by search query
		if (filters.searchQuery) {
			filteredExercises = filteredExercises.filter((exercise) =>
				exercise.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
			);
		}

		setExercises(filteredExercises);
	};

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
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Gym Exercise Library
			</Typography>

			<SearchFilters
				filters={filters}
				handleSearch={handleSearch}
				handleFilterChange={handleFilterChange}
				applyFilters={applyFilters}
				clearFilters={clearFilters}
			/>

			<Box sx={{ flexGrow: 1, my: 3 }}>
				<AppBar position='static'>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, marginLeft: 3 }}
					>
						Result count: {exercises.length}
					</Typography>
				</AppBar>
			</Box>

			<ExerciseList
				exercises={exercises}
				openExerciseDetails={openExerciseDetails}
				clearFilters={clearFilters}
			/>

			<ExerciseDetail
				selectedExercise={selectedExercise}
				open={detailsOpen}
				onClose={closeExerciseDetails}
				activeStep={activeStep}
				handleNext={handleNext}
				handleBack={handleBack}
			/>
		</Box>
	);
};

export default ExerciseApp;
