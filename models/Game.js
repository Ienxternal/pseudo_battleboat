// models/Game.js
const { Schema, model } = require('mongoose');


const gameSchema = new Schema({
  player1: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
  // Add other game-related fields as needed
});

const Game = model('Game', gameSchema);

module.exports = Game;
