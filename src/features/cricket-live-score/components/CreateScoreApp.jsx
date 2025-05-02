// React Client App (src/App.js)
import React, { useState, useEffect } from 'react';
// import './App.css';
import CricketScorecard from './CricketScorecard';
import MatchSelector from './MatchSelector';

function CreateScoreApp() {
	const [matches, setMatches] = useState([]);
	const [selectedMatch, setSelectedMatch] = useState(null);
	const [scoreData, setScoreData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch available matches when component mounts
	useEffect(() => {
		fetch('/api/matches')
			.then((response) => {
				if (!response.ok) throw new Error('Failed to fetch matches');
				return response.json();
			})
			.then((data) => {
				setMatches(data);
				if (data.length > 0) {
					setSelectedMatch(data[0].id);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, []);

	// Set up SSE connection when a match is selected
	useEffect(() => {
		if (!selectedMatch) return;

		setIsLoading(true);

		// Create SSE connection
		const eventSource = new EventSource(`/api/score/${selectedMatch}`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setScoreData(data);
			setIsLoading(false);
		};

		eventSource.onerror = (error) => {
			console.error('SSE error:', error);
			eventSource.close();
			setError('Connection to live scores failed');
			setIsLoading(false);
		};

		// Clean up on unmount or when selected match changes
		return () => {
			eventSource.close();
		};
	}, [selectedMatch]);

	const handleMatchChange = (matchId) => {
		setSelectedMatch(matchId);
		setScoreData(null);
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold text-center mb-6'>
				Live Cricket Scores
			</h1>

			<MatchSelector
				matches={matches}
				selectedMatch={selectedMatch}
				onSelectMatch={handleMatchChange}
			/>

			{isLoading && <div className='text-center mt-8'>Loading scores...</div>}

			{error && (
				<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4'>
					{error}
				</div>
			)}

			{scoreData && !isLoading && <CricketScorecard scoreData={scoreData} />}
		</div>
	);
}

export default CreateScoreApp;
