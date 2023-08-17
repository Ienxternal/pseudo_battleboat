import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto">
                <Link to="/" className="mr-4">Landing</Link>
                <Link to="/Signup" className="mr-4">Signup</Link>
                <Link to="/Login" className="mr-4">Login</Link>
                <Link to="/Logout" className="mr-4">Logout</Link>
                <Link to="/Lobby" className="mr-4">Lobby</Link>
                <Link to="/Create-game" className="mr-4">Create Game</Link>
                <Link to="/Game" className="mr-4">Game</Link>
            </div>
        </div>
    );
}

export default Navbar;