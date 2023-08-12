// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_SHIPS = gql`
  query GetShips {
    ships {
      _id
      name
      size
    }
  }
`;
