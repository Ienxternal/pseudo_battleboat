import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const credentials = { username, password };

            console.log('Sending credentials:', credentials);
            // Make an API call to authenticate the user
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login successful, redirect to the lobby page
                navigate('/lobby');
            } else {
                // Handle login error
                console.error('Login failed:', response.message);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin();
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
