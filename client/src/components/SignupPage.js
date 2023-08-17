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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-2xl font-thin leading-9 tracking-tight text-white">
            Sign up to Play
          </h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMessage && <p className=' text-white '>{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-6" action="/submit-url" method="POST">
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
                 
                  className="block w-full rounded-full border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-4"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  className="block w-full rounded-full border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-4"
                />
              </div>
            </div>
      
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  className="block w-full rounded-full border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-4"
                />
              </div>
            </div>
      
            <div>
              
              <button type="submit" className='flex w-full justify-center rounded-full bg-purple-400 px-2 py-2 text-sm font-semibold leading-6 text-opacity-50 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 outline outline-offset-2 outline-purple-400 mt-4'>
                Sign Up
            </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignupPage;
