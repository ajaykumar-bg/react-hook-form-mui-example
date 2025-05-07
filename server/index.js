// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Store connected clients for each match
const clients = new Map();

// Mock data - In a real app, this would come from a database or external API
const mockMatches = [
	{
		id: 'match1',
		teams: {
			home: 'India',
			away: 'Australia',
		},
		venue: 'Melbourne Cricket Ground',
		date: 'April 23, 2025',
	},
	{
		id: 'match2',
		teams: {
			home: 'England',
			away: 'New Zealand',
		},
		venue: "Lord's Cricket Ground",
		date: 'April 23, 2025',
	},
	{
		id: 'match3',
		teams: {
			home: 'Pakistan',
			away: 'South Africa',
		},
		venue: 'National Stadium, Karachi',
		date: 'April 23, 2025',
	},
];

// Mock score data generator
function generateMockScoreData(matchId) {
	const match = mockMatches.find((m) => m.id === matchId);

	if (!match) return null;

	// Generate random score data
	const inning = Math.random() > 0.5 ? 1 : 2;
	const currentScore = Math.floor(Math.random() * 350);
	const wickets = Math.floor(Math.random() * 10);
	const oversTotal = Math.floor(Math.random() * 50);
	const oversBalls = Math.floor(Math.random() * 6);
	const overs = `${oversTotal}.${oversBalls}`;

	return {
		matchDetails: {
			title: `${match.teams.home} vs ${match.teams.away}`,
			venue: match.venue,
			date: match.date,
			status:
				inning === 1
					? 'In Progress'
					: `${match.teams.away} needs ${Math.floor(
							Math.random() * 200
					  )} runs to win`,
		},
		inning,
		battingTeam: inning === 1 ? match.teams.home : match.teams.away,
		bowlingTeam: inning === 1 ? match.teams.away : match.teams.home,
		currentScore,
		wickets,
		overs,
		runRate: (currentScore / (oversTotal + oversBalls / 10)).toFixed(2),
		requiredRunRate: inning === 2 ? (Math.random() * 12).toFixed(2) : null,
		batsmen: [
			{
				name: 'Batsman 1',
				runs: Math.floor(Math.random() * 150),
				balls: Math.floor(Math.random() * 100),
				fours: Math.floor(Math.random() * 15),
				sixes: Math.floor(Math.random() * 8),
				strikeRate: Math.floor(Math.random() * 200),
				onStrike: true,
			},
			{
				name: 'Batsman 2',
				runs: Math.floor(Math.random() * 80),
				balls: Math.floor(Math.random() * 70),
				fours: Math.floor(Math.random() * 10),
				sixes: Math.floor(Math.random() * 5),
				strikeRate: Math.floor(Math.random() * 150),
				onStrike: false,
			},
		],
		bowlers: [
			{
				name: 'Bowler 1',
				overs: `${Math.floor(Math.random() * 10)}.${Math.floor(
					Math.random() * 6
				)}`,
				maidens: Math.floor(Math.random() * 3),
				runs: Math.floor(Math.random() * 60),
				wickets: Math.floor(Math.random() * 5),
				economy: (Math.random() * 10).toFixed(2),
				bowling: true,
			},
			{
				name: 'Bowler 2',
				overs: `${Math.floor(Math.random() * 10)}.${Math.floor(
					Math.random() * 6
				)}`,
				maidens: Math.floor(Math.random() * 2),
				runs: Math.floor(Math.random() * 70),
				wickets: Math.floor(Math.random() * 4),
				economy: (Math.random() * 10).toFixed(2),
				bowling: false,
			},
		],
		recentOvers: '1 4 W 0 2 1 | 0 0 1 4 6 0 | 0 W 0 1 2 4',
	};
}

// Routes
app.get('/api/matches', (req, res) => {
	res.json(mockMatches);
});

// Server-Sent Events endpoint
app.get('/api/score/:matchId', (req, res) => {
	const matchId = req.params.matchId;

	// Set headers for SSE
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');

	// Send initial data
	const scoreData = generateMockScoreData(matchId);
	res.write(`data: ${JSON.stringify(scoreData)}\n\n`);

	// Add this client to the clients map
	if (!clients.has(matchId)) {
		clients.set(matchId, new Set());
	}
	clients.get(matchId).add(res);

	// Remove client on close
	req.on('close', () => {
		if (clients.has(matchId)) {
			clients.get(matchId).delete(res);
			if (clients.get(matchId).size === 0) {
				clients.delete(matchId);
			}
		}
	});
});

// Simulate score updates every few seconds
function updateScores() {
	for (const [matchId, matchClients] of clients.entries()) {
		if (matchClients.size > 0) {
			const scoreData = generateMockScoreData(matchId);
			for (const client of matchClients) {
				client.write(`data: ${JSON.stringify(scoreData)}\n\n`);
			}
		}
	}
}

// Update scores every 10 seconds
setInterval(updateScores, 10000);

// Serve React app in production
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../build/index.html'));
// });
app.all('/{*any}', (req, res, next) => {});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
