// models/Player.js
const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Pull from User model
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  });
  
  const Player = model('Player', playerSchema);
  
  module.exports = Player;