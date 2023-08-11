const { Thought } = require('../models');
const { Ship } = require('../models');

const resolvers = {
  Query: {
    thoughts: async () => {
      return Thought.find().sort({ createdAt: -1 });
    },

    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },

    getShips: async () => {
      // Implement your logic to fetch ships from your database (e.g., MongoDB)
      const ships = await Ship.find(); // Replace with your actual database query
      
      return ships;
    },
  },

  Mutation: {
    /*addGame: async (parent, player1Id, player2Id) => {
      const newGame = new Game({
        player1: args.player1Id,
        player2: args.player2Id
      });

      await newGame.save();

      return newGame;*/
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      return Thought.create({ thoughtText, thoughtAuthor });
    },
    addComment: async (parent, { thoughtId, commentText }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
