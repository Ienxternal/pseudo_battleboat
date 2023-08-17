import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black black to-purple-900">
  <div className="landing-container container mx-auto sm:px-6 lg:px-8 flex flex-col  px-8 py-8 rounded-full bg-black bg-opacity-10 shadow-md">
    <h2 className="text-center mb-1 text-gray-500">Welcome to</h2>
    <h1 className="text-white text-center mb-4 text-5xl font-bold tracking-tight">BATTLEBOAT</h1>
        <div className="buttons-container  px-8  mx-auto max-w-xs rounded-2xl ">
            <Link to="/login">
                <button className='flex w-full justify-center rounded-full bg-purple-400 px-2 py-1.5 text-sm font-semibold leading-6 text-opacity-50 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 mt-6 outline outline-offset-2 outline-purple-400'>
                    LOGIN
                </button>
            </Link>
            <Link to="/signup">
                <button className='flex w-full justify-center rounded-full bg-purple-400 px-2 py-1.5 text-sm font-semibold leading-6 text-opacity-50 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 mt-6 outline outline-offset-2 outline-purple-400'>
                    SIGN UP
                </button>
            </Link>
        </div>

    </div>
</div>
    );
};

export default Landing;
