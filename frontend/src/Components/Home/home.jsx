import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../App.css';

import Navbar from '../Navbar';
import Users from '../Users/Users';
import Restaurants from '../Restaurants/Restaurants';
import MenuData from '../MenuData';


function Home() {
  return (
    <>
      <Routes>
        <Route path="" element={<h1>Home</h1>} />
        <Route path="Restaurants" element={<Restaurants />} />
        <Route path="MenuData" element={<MenuData />} />
        <Route path="Users" element={<Users />} />
      </Routes>
    </>
  );
}

export default Home;
