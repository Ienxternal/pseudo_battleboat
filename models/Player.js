// models/Player.js
const { Schema, model } = require('mongoose');


const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
  // Add other player-related fields as needed
});

const Player = model('Player', playerSchema);

module.exports = Player;
