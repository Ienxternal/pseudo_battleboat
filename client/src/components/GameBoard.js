// src/components/GameBoard.js
import React from 'react';

const GameBoard = ({ player1Board, player2Board, currentPlayer }) => {
    const isPlayer1 = currentPlayer === 'player1';

    return (
        <div className="game-board">
        <div className="player-board">
            <h3>{isPlayer1 ? 'Your Board' : 'Opponent Board'}</h3>
            <div className="board">
            {/* Render the player1Board cells */}
            </div>
        </div>
        <div className="player-board">
            <h3>{isPlayer1 ? 'Opponent Board' : 'Your Board'}</h3>
            <div className="board">
            {/* Render the player2Board cells */}
            </div>
        </div>
        </div>
    );
};

export default GameBoard;
