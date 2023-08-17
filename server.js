require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const http = require('http');
const path = require('path');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const User = require('./models/User'); 
const { typeDefs, resolvers } = require('./schemas');
const cors = require('cors')
const loginRoute = require('./api/auth/login');
const lobbyRoute = require('./api/auth/lobby');
const availableGamesRoute = require('./api/game/availableGames'); 
const createGameModule = require('./api/game/createGame');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create a new user and save to the database
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for handling user login
app.use('/api/auth/login', loginRoute);
// Route for handling lobby (available games)
app.use('/api/auth/lobby', lobbyRoute);
// Route for handling availableGames 
app.use('/api/game/availableGames', availableGamesRoute); 




const pubsub = new PubSub();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
  typeDefs: [createGameModule.typeDefs], 
  resolvers: [createGameModule.resolvers],
  context: ({ req }) => {
    // You can add context setup for HTTP requests here
  },
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT || 3001, () => {
    console.log(`API server running on port ${process.env.PORT || 3001}!`);
    console.log(`Use GraphQL at http://localhost:${process.env.PORT || 3001}${server.graphqlPath}`);

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

// MongoDB connection
console.log('Connecting to MongoDB:', process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

