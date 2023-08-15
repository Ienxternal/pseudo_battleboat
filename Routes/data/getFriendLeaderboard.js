const Leaderboard = require('../../models/Leaderboard');
const User = require('../../models/User');

exports.getFriendLeaderboard = async (req, res) => {
    try {
        const user = req.user; // Assuming you've set the authenticated user in the request object

        // Fetch the user's friends from the database
        const userData = await User.findById(user._id).populate('friends', 'username');

        const userFriends = userData.friends; // Assuming the friends are stored in the 'friends' field

        // Fetch the top scores of user's friends from the database
        const friendLeaderboard = await Leaderboard.find({ user: { $in: userFriends } })
            .sort({ score: -1 }) // Sort in descending order
            .limit(10) // Limit to the top 10 scores
            .populate('user', 'username'); // Populate user field with username only

        res.status(200).json(friendLeaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
