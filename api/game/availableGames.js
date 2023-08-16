// api/games/availableGames.js

const Game = require('../../models/Game');

// Function to fetch available games
async function fetchAvailableGames(req, res) {
    try {
        // Find active games that don't have a second player (player2 is not defined)
        const availableGames = await Game.find({
        status: 'active',
        player2: { $exists: false },
        }).populate('player1', 'username'); // Populate the player1 field with username

        if (availableGames.length === 0) {
        return res.status(200).json({ message: 'No available games. Start a new game now!' });
        }

        res.status(200).json(availableGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    fetchAvailableGames,
  // Add other controller functions as needed
};
