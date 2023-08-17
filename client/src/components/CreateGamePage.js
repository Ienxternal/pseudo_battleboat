import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../graphql/mutations'; // Import your mutation query

const CreateGamePage = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Use the useMutation hook
    const [createGame] = useMutation(CREATE_GAME, {
        onCompleted: (data) => {
            console.log('Create game mutation completed:', data);
            const gameId = data.createGame.id;
            navigate(`/game/${gameId}`); // Use navigate function to redirect
        },
    });

    const [player2Joined, setPlayer2Joined] = useState(false);

    const handleCreateGame = () => {
        console.log('Creating game...');
        // Call the createGame mutation function
        createGame();
    };

    const handlePlayer2Join = () => {
        console.log('Player 2 joined.');
        setPlayer2Joined(true);
    };

    console.log('Render CreateGamePage');

    return (
        <div className="create-game-container">
            <h2>Player 1 Info</h2>
            <p>Status: {player2Joined ? 'Waiting for Player 2' : 'Waiting for Players'}</p>
            
            <div className="player2-container">
                <h2>Player 2</h2>
                {player2Joined ? (
                    <p>Player 2 has joined</p>
                ) : (
                    <button onClick={handlePlayer2Join}>Join as Player 2</button>
                )}
            </div>
            
            <button disabled={!player2Joined} onClick={handleCreateGame}>
                Start Game
            </button>
        </div>
    );
};

export default CreateGamePage;
