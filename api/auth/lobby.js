const express = require('express');
const router = express.Router();

// Import the fetchAvailableGames function
const { fetchAvailableGames } = require('../game/availableGames'); 

// Define the route to fetch available games
router.get('/', async (req, res) => {
    try {
        const availableGames = await fetchAvailableGames();

        if (availableGames.length === 0) {
            return res.status(200).json({ message: 'No available games. Start a new game now!' });
        }

        res.status(200).json(availableGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
