// api/games/availableGames.js

const Game = require('../../models/Game');

// Function to fetch available games
async function fetchAvailableGames(req, res) {
    try {
        console.log('Fetching available games...');
        // Find active games that don't have a second player (player2 is not defined)
        const availableGames = await Game.find({
            status: 'active',
            player2: { $exists: false },
        }).populate('player1', 'username'); // Populate the player1 field with username

        if (availableGames.length === 0) {
            console.log('No available games. Sending message...');
            const emptyResponse = { 
                message: 'No available games. Start a new game now!', 
                games: [],
            };

            return res.status(200).json(emptyResponse);
        }

        console.log('Sending available games:', availableGames);
        res.status(200).json(emptyResponse.games);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = fetchAvailableGames; // Export the function directly
