const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const http = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

(async () => {
  // Wait for MongoDB connection to be established
  await db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // You can add context setup for HTTP requests here
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

    // Create a SubscriptionServer for handling subscriptions
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: (connectionParams, webSocket, context) => {
          // You can add connection-specific context here
        },
      },
      {
        server: httpServer,
        path: server.graphqlPath,
      }
    );
  });
})();
