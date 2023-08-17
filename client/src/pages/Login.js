// src/pages/Login.js
import React from 'react';
import LoginPage from '../components/LoginPage';
// this is the psuedo 
const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black black to-purple-900">
            <div className='container mx-auto sm:px-6 lg:px-8 flex flex-col  px-8 py-8 rounded-full bg-black bg-opacity-10 shadow-md'>
                <h2 className="text-center mb-1 text-gray-500">Welcome to</h2>
                <h1 className="text-white text-center mb-4 text-5xl font-bold">BATTLEBOAT</h1>
                
                <LoginPage />
            </div>
        </div>
    );
};

export default Login;
