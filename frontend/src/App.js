import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar';
import Login from './Components/LoginPage';
import Home from './Components/Home';
import Users from './Components/Users/Users';
import Restaurants from './Components/Restaurants/Restaurants';
import MenuData from './Components/MenuData';
import CreateAccount from './Components/CreateAccount';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic, and if successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/Home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {isLoggedIn && (
          <>
            <Route path="/Home/*" element={<Home />} />
            <Route path="Restaurants" element={<Restaurants />} />
            <Route path="MenuData" element={<MenuData />} />
            <Route path="Users" element={<Users />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;



