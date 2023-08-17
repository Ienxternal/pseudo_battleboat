const Leaderboard = require('../models/Leaderboard');

exports.getGlobalLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .sort({ score: -1 })
            .limit(10)
            .populate('user', 'username');

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

