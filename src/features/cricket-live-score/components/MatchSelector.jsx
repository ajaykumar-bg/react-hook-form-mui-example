import React from 'react';

function MatchSelector({ matches, selectedMatch, onSelectMatch }) {
	if (matches.length === 0) {
		return <div className='text-center my-4'>No matches available</div>;
	}

	return (
		<div className='mb-6'>
			<label
				htmlFor='match-selector'
				className='block text-sm font-medium text-gray-700 mb-2'
			>
				Select Match
			</label>
			<select
				id='match-selector'
				className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
				value={selectedMatch || ''}
				onChange={(e) => onSelectMatch(e.target.value)}
			>
				{matches.map((match) => (
					<option key={match.id} value={match.id}>
						{match.teams.home} vs {match.teams.away} ({match.venue})
					</option>
				))}
			</select>
		</div>
	);
}

export default MatchSelector;
