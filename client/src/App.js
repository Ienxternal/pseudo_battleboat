import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
import Logout from './pages/Logout'; 
import Landing from './pages/Landing'; 
import Lobby from './pages/Lobby'; 
import CreateGame from './pages/CreateGame'; 
import Game from './pages/Game'; 

const App = () => {
    const handleSignup = async (username, email, password) => {
        // Implement your signup logic here
        // For example, you can make an API request to your backend
    };

    return (
        <Router>
            <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
                    <Route path="/Login" exact element={<Login />} />
                    <Route path="/Logout" element={<Logout />} />
                    <Route path="/Lobby" component={<Lobby />} />
                    <Route path="/Create-game" element={<CreateGame />} />
                    <Route path="/Game" element={<Game />} />
                    {/* Add your other routes here */}
            </Routes> 
        </Router>  
    );
};

export default App;
