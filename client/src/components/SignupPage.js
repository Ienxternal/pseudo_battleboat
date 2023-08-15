import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                // Handle error response
                const responseData = await response.json();
                throw new Error(responseData.message || 'Signup failed');
            }

            // Signup successful
            // You can optionally handle success messages or actions here
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            // Handle any errors that occur during signup
            setErrorMessage(`An error occurred during signup: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignup();
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;
