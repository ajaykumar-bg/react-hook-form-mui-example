import React from 'react';

function CricketScorecard({ scoreData }) {
	const {
		matchDetails,
		// inning,
		battingTeam,
		// bowlingTeam,
		currentScore,
		wickets,
		overs,
		runRate,
		requiredRunRate,
		batsmen,
		bowlers,
	} = scoreData;

	return (
		<div className='bg-white shadow-lg rounded-lg overflow-hidden'>
			{/* Match Header */}
			<div className='bg-blue-600 text-white p-4'>
				<h2 className='text-xl font-bold'>{matchDetails.title}</h2>
				<p className='text-sm'>
					{matchDetails.venue} | {matchDetails.date}
				</p>
				<p className='text-sm mt-1'>{matchDetails.status}</p>
			</div>

			{/* Score Summary */}
			<div className='p-4 bg-blue-50 border-b'>
				<div className='flex justify-between items-center'>
					<div>
						<span className='font-bold text-xl'>{battingTeam}</span>
						<span className='text-2xl font-bold ml-3'>
							{currentScore}/{wickets}
						</span>
						<span className='text-gray-600 ml-2'>({overs} ov)</span>
					</div>
					<div>
						<span className='text-sm text-gray-600'>CRR: {runRate}</span>
						{requiredRunRate && (
							<span className='text-sm text-gray-600 ml-2'>
								REQ: {requiredRunRate}
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Batsmen */}
			<div className='p-4 border-b'>
				<h3 className='font-bold mb-2'>Batsmen</h3>
				<table className='w-full'>
					<thead>
						<tr className='text-left text-sm text-gray-600 border-b'>
							<th className='pb-2'>Batsman</th>
							<th className='pb-2 text-right'>R</th>
							<th className='pb-2 text-right'>B</th>
							<th className='pb-2 text-right'>4s</th>
							<th className='pb-2 text-right'>6s</th>
							<th className='pb-2 text-right'>SR</th>
						</tr>
					</thead>
					<tbody>
						{batsmen.map((batsman, index) => (
							<tr key={index} className='border-b'>
								<td className='py-2'>
									{batsman.name} {batsman.onStrike ? '* ' : ''}
								</td>
								<td className='py-2 text-right'>{batsman.runs}</td>
								<td className='py-2 text-right'>{batsman.balls}</td>
								<td className='py-2 text-right'>{batsman.fours}</td>
								<td className='py-2 text-right'>{batsman.sixes}</td>
								<td className='py-2 text-right'>{batsman.strikeRate}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Bowlers */}
			<div className='p-4'>
				<h3 className='font-bold mb-2'>Bowlers</h3>
				<table className='w-full'>
					<thead>
						<tr className='text-left text-sm text-gray-600 border-b'>
							<th className='pb-2'>Bowler</th>
							<th className='pb-2 text-right'>O</th>
							<th className='pb-2 text-right'>M</th>
							<th className='pb-2 text-right'>R</th>
							<th className='pb-2 text-right'>W</th>
							<th className='pb-2 text-right'>ER</th>
						</tr>
					</thead>
					<tbody>
						{bowlers.map((bowler, index) => (
							<tr key={index} className='border-b'>
								<td className='py-2'>
									{bowler.name} {bowler.bowling ? '* ' : ''}
								</td>
								<td className='py-2 text-right'>{bowler.overs}</td>
								<td className='py-2 text-right'>{bowler.maidens}</td>
								<td className='py-2 text-right'>{bowler.runs}</td>
								<td className='py-2 text-right'>{bowler.wickets}</td>
								<td className='py-2 text-right'>{bowler.economy}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Last Few Overs */}
			{scoreData.recentOvers && (
				<div className='p-4 border-t'>
					<h3 className='font-bold mb-2'>Recent Overs</h3>
					<div className='text-sm'>{scoreData.recentOvers}</div>
				</div>
			)}
		</div>
	);
}

export default CricketScorecard;
