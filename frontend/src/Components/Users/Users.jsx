import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../../constants";

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({ setError, fetchUsers }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const addUser = (event) => {
    event.preventDefault();
    axios
      .post(USERS_ENDPOINT, {
        "first name": first_name,
        "last name": last_name,
        email: email,
        password: password,
      }) // actual attribute name: this file's var/val
      .then((response) => {
        setError("");
        fetchUsers();
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          setError(e.response.data.message);
        } else {
          setError("There was a problem adding a user");
        }
      });
  };

  return (
    <form>
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        id="first_name"
        value={first_name}
        onChange={changeFirstName}
      />

      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        id="last_name"
        value={last_name}
        onChange={changeLastName}
      />

      <label htmlFor="email">Email</label>
      <input type="text" id="email" value={email} onChange={changeEmail} />

      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        value={password}
        onChange={changePassword}
      />

      <button type="submit" onClick={addUser}>
        Add User
      </button>
    </form>
  );
}

function Users() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleUserClick = (_id) => {
    navigate("/SelectUser?ID=" + encodeURIComponent(_id));
  };

  const fetchUsers = () => {
    axios
      .get(USERS_ENDPOINT)
      .then((response) => {
        const usersObject = response.data.DATA;
        const usersArray = Object.values(usersObject);
        setUsers(usersArray);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("There was a problem fetching all users.");
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="center">
      <h1>Users</h1>

      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="user-row"
              onClick={() => handleUserClick(user._id)}
            >
              <td>{user["first name"]}</td>
              <td>{user["last name"]}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
