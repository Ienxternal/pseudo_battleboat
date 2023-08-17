import React from 'react';
import SignupPage from '../components/SignupPage';

function Signup({ handleSignup }) {
    console.log('handleSignup function in Signup:', handleSignup); // Check if handleSignup is a function
    return (
        <div>
            <h1>Welcome to Our App</h1>
            <SignupPage handleSignup={handleSignup} />
        </div>
    );
}

export default Signup;
