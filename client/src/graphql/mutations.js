// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const ADD_GAME = gql`
    mutation AddGame($player1Id: ID!, $player2Id: ID) {
        addGame(player1Id: $player1Id, player2Id: $player2Id) {
        _id
        player1 {
            _id
            username
        }
        player2 {
            _id
            username
        }
        }
    }
`;
