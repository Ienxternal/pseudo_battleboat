const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Received login request for username:', username);

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`User with username ${username} not found`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Found user in the database:', user);

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Password comparison failed: Hash mismatch');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log('Generated JWT token:', token);

        res.status(200).json({ message: 'Login successful', token, userId:user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
