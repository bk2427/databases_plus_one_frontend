


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserForm from './UpdateUserForm'; // Import the component for the popup form

import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({ setError, fetchUsers }) {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [userIds, setUserIds] = useState([]);


	const changeFirstName = (event) => { setFirstName(event.target.value); };
	const changeLastName  = (event) => {  setLastName(event.target.value); };
	const changeEmail  = (event) => {  setEmail(event.target.value); };
	const changePassword  = (event) => {  setPassword(event.target.value); };
  


	const addUser = (event) => {
		event.preventDefault();
		axios.post(USERS_ENDPOINT, { "first name": first_name, "last name": last_name, email: email, password: password }) // actual attribute name: this file's var/val
			.then((response) => {
        const newUserId = response.data.id; // Assuming the API response contains the user ID
        setUserIds([...userIds, newUserId]); // Store the new user ID in the state variable
				setError('');
				fetchUsers();
			})
			.catch((e) => {
			    if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } else {
			        setError('There was a problem adding a user');
			    }
			});
	};

	return (
		<form>
			<label htmlFor="first_name">
				First Name
			</label>
			<input type="text" id="first_name" value={first_name} onChange={changeFirstName} />

			<label htmlFor="last_name">
				Last Name
			</label>
			<input type="text" id="last_name" value={last_name} onChange={changeLastName} />

			<label htmlFor="email">
				Email
			</label>
			<input type="text" id="email" value={email} onChange={changeEmail} />

			<label htmlFor="password">
				Password
			</label>
			<input type="text" id="password" value={password} onChange={changePassword} />

			<button type="submit" onClick={addUser}>Add User</button>
		</form>
	);
}

function Users() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to manage selected user for update
  const [showPopup, setShowPopup] = useState(false); // State to manage visibility of popup form

  const fetchUsers = () => {
    axios.get(USERS_ENDPOINT)
      .then((response) => {
        const usersObject = response.data.DATA;
        const usersArray = Object.values(usersObject);
        setUsers(usersArray);
        
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('There was a problem fetching all users.');
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle when a user's information is clicked
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  // Function to handle updating the user's information
  const updateUser = (newEmail) => {
    axios.put(`${USERS_ENDPOINT}/${selectedUser._id}/${newEmail}`)
      .then(() => {
        setError('');
        fetchUsers();
        setShowPopup(false); // Hide the popup after successful update
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('There was a problem updating the user.');
        }
      });
  };

  return (
    <div className="wrapper">
      <h1>Users</h1>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <AddUserForm setError={setError} fetchUsers={fetchUsers} />

      {users.map((user, index) => (
        <div key={index} className="user-container" onClick={() => handleUserClick(user)}> {/* Attach click handler to each user */}
          <h2>Email: {user.email}</h2>
          <p>First Name: {user['first name']}</p>
          <p>Last Name: {user['last name']}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}

      {/* Render the popup form if showPopup state is true */}
      {showPopup && selectedUser && (
        <div className="popup">
          <UpdateUserForm user={selectedUser} updateUser={updateUser} />
        </div>
      )}
    </div>
  );
}

export default Users;




