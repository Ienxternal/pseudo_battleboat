import { gql } from '@apollo/client';

// Subscription to receive game updates
export const GAME_SUBSCRIPTION = gql`
    subscription GameUpdated($gameId: ID!) {
        gameUpdated(gameId: $gameId) {
        _id
        player1 {
            _id
            username
        }
        player2 {
            _id
            username
        }
        status
        # Add more fields as needed for game updates
        }
    }
`;
export const GAME_UPDATED_SUBSCRIPTION = gql`
    subscription GameUpdated($gameId: ID!) {
        gameUpdated(id: $gameId) {
        player2 {
            id
        }
        status
        # Other fields you need
    }
}
`;

// ... Define more subscriptions as needed
