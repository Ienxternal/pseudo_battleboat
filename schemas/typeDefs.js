const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Ship {
    id: ID!
    name: String!
    size: Int!
  }

  type Player {
    id: ID!
    name: String!
    shipArray: [Ship!]
  }

  type Game {
    id: ID!
    player1: Player!
    player2: Player
    ships: [Ship!]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type Query {
    getShips: [Ship]!
    
  }

  type Query {
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
