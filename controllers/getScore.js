const Score = require('../models/Score');

exports.saveScore = async (req, res) => {
    try {
        const { userId, score } = req.body;

        // Create a new Score entry in the database
        const newScore = new Score({ user: userId, score });
        await newScore.save();

        res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};