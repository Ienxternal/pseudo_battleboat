import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Lobby = () => {
  const [availableGames, setAvailableGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('api/games/availableGames')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAvailableGames(data);
        setLoading(false);
      })
      .catch(error => {
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
