// const express = require('express');
// const router = express.Router();
// const getGlobalLeaderboardController = require('../controllers/getGlobalLeaderboard');
// const getFriendLeaderboardController = require('../controllers/getFriendLeaderboard');

// // Define routes for global leaderboard and friend leaderboard
// router.get('/leaderboard', getGlobalLeaderboardController.getGlobalLeaderboard);
// router.get('/leaderboard/friends', getFriendLeaderboardController.getFriendLeaderboard);

// module.exports = router;


const express = require('express');
const router = express.Router();
const getGlobalLeaderboardController = require('../../controllers/getGlobalLeaderboard'); // Import the getGlobalLeaderboard controller
const getFriendLeaderboardController = require('../../controllers/getFriendLeaderboard'); // Import the getFriendLeaderboard controller

// Define route for global leaderboard
router.get('/leaderboard', getGlobalLeaderboardController.getGlobalLeaderboard);

// Define route for friend leaderboard
router.get('/leaderboard/friends', getFriendLeaderboardController.getFriendLeaderboard);

module.exports = router;
