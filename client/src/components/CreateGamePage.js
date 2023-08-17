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
        // <div className="create-game-container">
        //     <h2>Player 1 Info</h2>
        //     <p>Status: {player2Joined ? 'Waiting for Player 2' : 'Waiting for Players'}</p>
            
        //     <div className="player2-container">
        //         <h2>Player 2</h2>
        //         {player2Joined ? (
        //             <p>Player 2 has joined</p>
        //         ) : (
        //             <button onClick={handlePlayer2Join}>Join as Player 2</button>
        //         )}
        //     </div>
            
        //     <button disabled={!player2Joined} onClick={handleCreateGame}>
        //         Start Game
        //     </button>
        // </div>
<div className="bg-gradient-to-b from-black to-purple-900">
      <div className="flex items-center justify-center min-h-screen">
        <div className="create-game-container container mx-auto sm:px-4 lg:px-4 flex flex-col px-8 py-10 rounded-full bg-black bg-opacity-10 shadow-md">
          <h1 className="text-white text-center mb-4 py-10 text-4xl font-bold tracking-tight">
            PLAYER 1 INFO
          </h1>
          <h2 className="text-center mb-4 text-gray-500">
            ·STATUS· {player2Joined ? 'Waiting for Player 2' : 'Waiting for Players'}
          </h2>
          <h1 className="text-white text-center mb-4 py-10 text-4xl font-bold tracking-tight player2-container">
            PLAYER 2
          </h1>
          {player2Joined ? (
                    <p>PLAYER 2 HAS JOINED</p>
                ) : (
                    <button onClick={handlePlayer2Join}  className='text-center mb-4 text-gray-500'>JOIN AS PLAYER 2</button>
                )}
          <div className="buttons-container px-8 mx-auto max-w-xs rounded-2xl">
            <button
              className="flex w-full justify-center rounded-full  bg-purple-400 px-4 py-4 text-4xl font-semibold leading-6 text-black text-opacity-75 shadow-sm hover:bg-purple-200 focus:outline-none focus:ring focus:ring-purple-500 mt-8 outline outline-offset-2 outline-purple-400 mb-4"
              disabled= {!player2Joined} onClick={handleCreateGame}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>

    );
};

export default CreateGamePage;
