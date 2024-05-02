import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://databases-plus-one-b6341ffdbbfd.herokuapp.com/users"
      );
      const userData = await response.json();

      if (userData.DATA[email]) {
        if (userData.DATA[email].password === password) {
          // Successful login
          setMessage("");
          onLogin(userData.DATA[email]._id);
        } else {
          setMessage("Wrong password");
        }
      } else {
        setMessage("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="back">
      <div class="main">
        <h2 class="login">Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="user">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="pass">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" class="submit">
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
        <div class="account">
          <Link to="/create-account" class="am">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
