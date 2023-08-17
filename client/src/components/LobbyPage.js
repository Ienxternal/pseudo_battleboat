import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../graphql/mutations'

const Lobby = () => {
  const [availableGames, setAvailableGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setAvailableGames(data.games);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="lobby-container">
      <div className="lobby-buttons">
        <Link to="/create-game">
          <button>Create Game</button>
        </Link>
      </div>
      <div className="recent-games">
        <h2>Available Games</h2>
        {availableGames.length === 0 ? (
          <p>No available games. Start a new game now!</p>
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
  );
};

export default Lobby;
