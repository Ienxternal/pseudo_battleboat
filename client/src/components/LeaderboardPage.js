// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_GLOBAL_LEADERBOARD, GET_FRIEND_LEADERBOARD, SAVE_SCORE_MUTATION } from '../graphql/queries';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_GLOBAL_LEADERBOARD,
  GET_FRIEND_LEADERBOARD,
} from '../graphql/queries'; // Import other queries
import { SAVE_SCORE_MUTATION } from '../graphql/mutations'; // Import the mutation from mutations.js.


const Leaderboard = () => {
  const { loading: globalLoading, error: globalError, data: globalData } = useQuery(GET_GLOBAL_LEADERBOARD);
  const { loading: friendLoading, error: friendError, data: friendData } = useQuery(GET_FRIEND_LEADERBOARD);

 const [saveScore] = useMutation(SAVE_SCORE_MUTATION);

  const [score, setScore] = useState(0); // State for tracking user's score input

  const handleSaveScore = () => {
    // Call the saveScore mutation here with the user's score
    saveScore({
      variables: {
        userId: 'YOUR_USER_ID', // Replace with actual user ID
        score: score,
      },
    })
      .then(() => {
        console.log('Score saved successfully');
      })
      .catch((error) => {
        console.error('Error saving score:', error.message);
      });
  };

  if (globalLoading || friendLoading) return <p>Loading...</p>;
  if (globalError) return <p>Error loading global leaderboard: {globalError.message}</p>;
  if (friendError) return <p>Error loading friend leaderboard: {friendError.message}</p>;

  const globalLeaderboard = globalData.leaderboard;
  const friendLeaderboard = friendData.friendLeaderboard;

  return (
    <div>
      <h1>Global Leaderboard</h1>
      <ul>
        {globalLeaderboard.map((entry, index) => (
          <li key={entry.user._id}>
            {index + 1}. {entry.user.username} - Score: {entry.score}
          </li>
        ))}
      </ul>

      <h1>Friend Leaderboard</h1>
      <ul>
        {friendLeaderboard.map((entry, index) => (
          <li key={entry.user._id}>
            {index + 1}. {entry.user.username} - Score: {entry.score}
          </li>
        ))}
      </ul>

      <div>
        <h2>Save Your Score</h2>
        <input type="number" value={score} onChange={(e) => setScore(parseInt(e.target.value))} />
        <button onClick={handleSaveScore}>Save Score</button>
      </div>
    </div>
  );
};

export default Leaderboard;
