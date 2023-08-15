import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'; // Adjust the path based on your file structure
import Signup from './pages/Signup'; // Adjust the path based on your file structure
import Logout from './pages/Logout'; // Adjust the path based on your file structure
import Landing from './pages/Landing'; // Adjust the path based on your file structure
import Lobby from './pages/Lobby'; // Adjust the path based on your file structure
import CreateGame from './pages/CreateGame'; // Adjust the path based on your file structure
import Game from './pages/Game'; // Adjust the path based on your file structure

const App = () => {
    return (
        <Router>

            <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/Signup" element={<Signup />} />
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
