// src/components/GameSetup.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SHIPS } from '../graphql/queries';

const GameSetup = () => {
    const [ships, setShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);
    const [gameBoard, setGameBoard] = useState([]); // You need to add this state

    const { loading, error, data } = useQuery(GET_SHIPS);

    useEffect(() => {
        if (data && data.getShips) {
            setShips(data.getShips);
        }
    }, [data]);

    useEffect(() => {
        // Initialize the game board when ships or other dependencies change
        const rows = 10;
        const cols = 10;
        const emptyCell = 'empty';
        const board = [];
        for (let i = 0; i < rows; i++) {
            const row = Array(cols).fill(emptyCell);
            board.push(row);
        }
        setGameBoard(board);
    }, [ships]);

    const handleCellClick = (row, col) => {
        if (selectedShip) {
            const shipSize = selectedShip.size;
        
            // Check if the ship can be placed horizontally without going out of bounds
            if (col + shipSize <= 10) {
            // Check if the cells are empty
            let isValidPlacement = true;
            for (let i = col; i < col + shipSize; i++) {
                if (gameBoard[row][i] !== 'empty') {
                isValidPlacement = false;
                break;
                }
            }
        
            if (isValidPlacement) {
                // Update the game board state with the ship placement
                const updatedBoard = [...gameBoard];
                for (let i = 0; i < shipSize; i++) {
                updatedBoard[row][col + i] = selectedShip.name;
                }
                setGameBoard(updatedBoard);
            } else {
                // Display an error message or handle invalid placement
            }
            } else {
            // Display an error message or handle invalid placement
            }
        }
    };
        
    const handleShipClick = (ship) => {
        setSelectedShip(ship);
    };
    return (
        <div>
            <h2>Game Setup</h2>
            <div className="ship-list">
                {ships.map((ship) => (
                    <div
                        key={ship.name}
                        className={`ship ${selectedShip === ship ? 'selected' : ''}`}
                        onClick={() => handleShipClick(ship)}
                    >
                        {ship.name}
                    </div>
                ))}
            </div>
            <div className="game-board">
                {/* Render the game board cells and handle cell clicks */}
                {gameBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`board-cell ${cell}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameSetup;
