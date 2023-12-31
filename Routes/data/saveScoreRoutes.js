const express = require('express');
const router = express.Router();
const getScoreController = require('../../controllers/saveScore'); // Import the saveScore controller

// Define route for saving user's score
router.post('/save-score', getScoreController.saveScore);

module.exports = router;



// const Leaderboard = require('../../models/Leaderboard');

// exports.getGlobalLeaderboard = async (req, res) => {
//     try {
//         // Fetch the top scores with user information from the database
//         const leaderboard = await Leaderboard.find()
//             .sort({ score: -1 }) // Sort in descending order
//             .limit(10) // Limit to the top 10 scores
//             .populate('user', 'username'); // Populate user field with username only

//         res.status(200).json(leaderboard);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
