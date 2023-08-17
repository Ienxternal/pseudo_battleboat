const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

exports.getFriendLeaderboard = async (req, res) => {
    try {
        const user = req.user;

        const userData = await User.findById(user._id).populate('friends', 'username');
        const userFriends = userData.friends;

        const friendLeaderboard = await Leaderboard.find({ user: { $in: userFriends } })
            .sort({ score: -1 })
            .limit(10)
            .populate('user', 'username');

        res.status(200).json(friendLeaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


