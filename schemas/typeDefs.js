const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Ship {
    _id: ID
    name: String!
    size: Int!
  }

  type Player {
    _id: ID
    userId: Int!
    username: String!
  }

  type Game {
    _id: ID
    player1: Player!
    player2: Player
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
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
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    addUser(username: String!, email: String!, password: String!): User
    addGame(player1Id: ID!, player2Id: ID): Game
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
