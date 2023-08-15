const express = require('express');
const router = express.Router();
const getGlobalLeaderboardController = require('../controllers/getGlobalLeaderboard');
const getFriendLeaderboardController = require('../controllers/getFriendLeaderboard');

// Define routes for global leaderboard and friend leaderboard
router.get('/leaderboard', getGlobalLeaderboardController.getGlobalLeaderboard);
router.get('/leaderboard/friends', getFriendLeaderboardController.getFriendLeaderboard);

module.exports = router;



//NEED TO FIX THESE

// const express = require('express');
// const router = express.Router();
// const getGlobalLeaderboardController = require('../../controllers/getLeaderboard');
// const getFriendLeaderboardController = require('../controllers/getFriendLeaderboard');

// const Score = require('../../models/Score'); // Import the Score model
// const Leaderboard = require('../../models/Leaderboard'); // Import the Leaderboard model

// // Define routes for global leaderboard and friend leaderboard
// router.get('/leaderboard', getGlobalLeaderboardController.getGlobalLeaderboard);
// router.get('/leaderboard/friends', getFriendLeaderboardController.getFriendLeaderboard);

// module.exports = router;