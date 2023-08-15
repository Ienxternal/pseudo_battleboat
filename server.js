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
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import the User model
const { typeDefs, resolvers } = require('./schemas');
var cors = require('cors')

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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`User with username ${username} not found`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Hash the provided password using bcrypt
    const hashedInputPassword = await bcrypt.hash(password, 10);

    console.log('Stored Hashed Password:', user.password);
    console.log('Hashed Input Password:', hashedInputPassword);

    // Compare the hashed input password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  console.log('Password comparison failed: Hash mismatch');
  return res.status(400).json({ message: 'Invalid credentials' });
}

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });     
  }
});



const pubsub = new PubSub();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
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
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
