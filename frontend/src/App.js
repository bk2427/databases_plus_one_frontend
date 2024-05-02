import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Login from "./Components/LoginPage";
import Home from "./Components/Home";
import Users from "./Components/Users/Users";
import Restaurants from "./Components/Restaurants/Restaurants";
import MenuData from "./Components/MenuData";
import CreateAccount from "./Components/CreateAccount";
import RestInfoPage from "./Components/RestInfoPage/RestInfoPage";
import SelectUser from "./Components/SelectUser/SelectUser";


const UserIdContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  return (
    <UserIdContext.Provider value={userId}>
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/Home" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/create-account" element={<CreateAccount />} />
          {isLoggedIn && (
            <>
              <Route path="/Home" element={<Home />} />
              <Route path="/Restaurants" element={<Restaurants />} />
              <Route path="/MenuData" element={<MenuData />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/restInfoPage" element={<RestInfoPage />} />
              <Route path="/SelectUser" element={<SelectUser />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </UserIdContext.Provider>
  );
}


export function useUserId() {
  return useContext(UserIdContext);
}

export default App;
