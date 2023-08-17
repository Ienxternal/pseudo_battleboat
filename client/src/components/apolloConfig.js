// apolloConfig.js

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Use the correct URL for your server
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export { client, httpLink };
