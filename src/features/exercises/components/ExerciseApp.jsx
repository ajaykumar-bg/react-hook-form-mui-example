import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import exercisesData from '../constants/exercises.json';

import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';

// Main App Component
const ExerciseApp = () => {
	const [exercises, setExercises] = useState(exercisesData?.exercises);
	const [filters, setFilters] = useState({
		muscle: '',
		equipment: '',
		category: '',
		force: '',
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

	const clearFilters = () => {
		setFilters({
			muscle: '',
			equipment: '',
			category: '',
			force: '',
			difficulty: '',
			searchQuery: '',
		});
	};

	// Apply filters
	useEffect(() => {
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

			<SearchFilters
				filters={filters}
				handleSearch={handleSearch}
				handleFilterChange={handleFilterChange}
			/>

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
		</Container>
	);
};

export default ExerciseApp;
