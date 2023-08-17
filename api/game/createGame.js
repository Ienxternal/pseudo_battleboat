const { gql } = require('apollo-server-express');
const { Game } = require('../../models'); // Import your Game model

// Define your mutation schema
const typeDefs = gql`
    type Mutation {
        createGame: Game
    }
`;

// Define your mutation resolver
const resolvers = {
    Mutation: {
        createGame: async () => {
            try {
                const newGame = new Game({
                    // Populate with necessary data for your Game model
                });
                const savedGame = await newGame.save();
                return savedGame;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to create game');
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
