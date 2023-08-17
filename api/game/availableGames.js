// api/games/availableGames.js

const Game = require('../../models/Game');

// Function to fetch available games
async function fetchAvailableGames(req, res) {
    try {
        console.log('Fetching available games...');
        // Find active games that don't have a second player (player2 is not defined)
        const response = await Game.find({
            status: 'active',
            player2: { $exists: false },
        })//.populate('player1', 'username'); // Populate the player1 field with username

        if (response.length === 0) {
            console.log('No available games. Sending message...');
             response = { 
                message: 'No available games. Start a new game now!', 
                games: [],
            };

        }
        return res.status(200).json(response);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = fetchAvailableGames; // Export the function directly
