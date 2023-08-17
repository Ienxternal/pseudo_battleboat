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
        <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                 
                  className="block w-full rounded-full border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 mb-2 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-4"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6  text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  className="block w-full rounded-full  border-0 bg-white/5 py-2 mt-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-4"
                />
              </div>
            </div>
            <div className="flex items-center mt-6">
                <button type="submit" onClick={handleLogin} className="flex w-full justify-center rounded-full bg-purple-400 px-2 py-2 text-sm font-semibold leading-6 text-opacity-50 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 outline outline-offset-2 outline-purple-400 mt-4'">
                    Login
                </button>
            </div>
        </form>
    </div>
</div>
);
};
export default LoginPage;
