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
                const data = await response.json();
                console.log(data);
                
                // Login successful, redirect to the lobby page
                navigate('/lobby', { state: { userId: data.userId } });
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

//     const Login = () => {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black black to-purple-900">
//                 <div className='container mx-auto sm:px-6 lg:px-8 flex flex-col  px-8 py-8 rounded-full bg-black bg-opacity-10 shadow-md'>
//                     <h2 className="text-center mb-1 text-gray-500">Welcome to</h2>
//                     <h1 className="text-white text-center mb-4 text-5xl font-bold">BATTLEBOAT</h1>
                    
//                     <LoginPage />
//                 </div>
//             </div>
//         );
//     };
// };

return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black black to-purple-900">
    <div className='container mx-auto sm:px-6 lg:px-8 flex flex-col items-center px-8 py-8 rounded-full bg-black bg-opacity-10 shadow-md'>
        <h2 className="text-center mb-1 text-gray-500">Welcome to</h2>
        <h1 className="text-white text-center mb-4 text-5xl font-bold">BATTLEBOAT</h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
            <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <button type="submit" onClick={handleLogin} className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
            </div>
        </form>
    </div>
</div>
);
};
export default LoginPage;
