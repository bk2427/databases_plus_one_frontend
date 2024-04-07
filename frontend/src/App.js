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
import RestInfoPage from './Components/RestInfoPage/RestInfoPage';
import SelectUser from './Components/SelectUser/SelectUser';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    // Perform your login logic, and if successful, set isLoggedIn to true
    setIsLoggedIn(true);
    setUserId(id);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/Home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {isLoggedIn && (
          <>
            <Route path="/Home" element={<Home userId={userId} />} />
            <Route path="Restaurants" element={<Restaurants />} />
            <Route path="MenuData" element={<MenuData />} />
            <Route path="Users" element={<Users />} />
            <Route path="restInfoPage" element={<RestInfoPage />} />
            <Route path="SelectUser" element={<SelectUser />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;



