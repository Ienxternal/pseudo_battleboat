import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { CREATE_GAME } from '../graphql/mutations';
import { httpLink } from './apolloConfig';
import { concatAST } from 'graphql';
import CreateGame from '../pages/CreateGame';



const Lobby = () => {
  const [availableGames, setAvailableGames] = useState([]);
  const [loadingGames, setLoading] = useState(true);
  const [errorLoadingGames, setError] = useState(null);

  const [createGame, { data, loading, error }] = useMutation(CREATE_GAME);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    console.log('Fetching available games...');
    fetch('http://localhost:3001/api/game/availableGames')
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
          console.log('API request failed with status:', response.status);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setAvailableGames(data.games); // Use data.games directly to set the state
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleCreateGame = async () => {
    //get login user id
    const userId = location.state.userId;
    //execute create game
    const {data} = await createGame({
      variables: {
        name: 'New Game',
        player1Id: userId
      }});
    //route to game page

    
};

  return (
    // <div className="lobby-container">
    //   <div className="lobby-buttons">
    //     <Link to="/create-game">
    //       <button onClick={handleCreateGame} >Create Game</button>
    //     </Link>
    //   </div>
    //   <div className="recent-games">
    //     <h2>Available Games</h2>
    //     {availableGames.length === 0 ? (
    //       <p>No available games. Start a new game now!</p>
    //     ) : (
    //       <ul>
    //         {availableGames.map(game => (
    //           <li key={game.id}>
    //             <Link to={`/game/${game.id}`}>{/* Display name and ID */}</Link>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    // </div>
    <div className="bg-gradient-to-b from-black to-purple-900">
  <div className="flex items-center justify-center min-h-screen">
    <div className="create-game-container container mx-auto sm:px-4 lg:px-4 flex flex-col px-8 py-10 rounded-full bg-black bg-opacity-10 shadow-md">
      {/* Insert dynamic content here using JavaScript */}
      <div className="buttons-container px-8 mx-auto rounded-2xl">
        <button
          className="flex w-full justify-center rounded-full bg-purple-400 px-6 py-6 text-4xl font-bold leading-6 text-opacity-50 shadow-sm hover:bg-purple-200 focus:outline-none focus:ring focus:ring-purple-500 mt-6 mb-3 outline outline-offset-2 outline-purple-400"
          onClick={handleCreateGame}
        >
          CREATE GAME
        </button>
      </div>
      <div className="buttons-container px-8 mx-auto rounded-2xl">
        <button
          className="flex w-full justify-center rounded-full bg-purple-400 px-9 py-6 text-4xl font-bold leading-6 text-opacity-50 shadow-sm hover:bg-purple-200 focus:outline-none focus:ring focus:ring-purple-500 mt-6 mb-3 outline outline-offset-2 outline-purple-400"
        >
          START GAME
        </button>
        {availableGames.length === 0 ? (
          <p className='text-center mb-4 text-gray-500 mt-2'>No available games. Start a new game now!</p>
        ) : (
          <ul>
            {availableGames.map(game => (
              <li key={game.id}>
                <Link to={`/game/${game.id}`}>{/* Display name and ID */}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Lobby;
