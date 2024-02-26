import React, { useEffect, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

function AddUserForm({ setError, fetchUsers, cancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeEmail = (event) => { setEmail(event.target.value); };

  const addUser = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/users', { name: name, email: email })
    .then(() => {
      setError('');
      fetchUsers();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={changeEmail}/>
      <button type="submit" onClick={addUser}>Submit</button>
      <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}

AddUserForm.propTypes = {
  cancel: propTypes.func.isRequired,
  fetchUsers: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function Users() {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
  
    const fetchUsers = () => {
      axios.get('http://localhost:8000/users')
      .then((response) => {
        setUsers(response.data); 
        console.log(response);
      })
      .catch(() => { setError('Something went wrong'); });
    };
  
    useEffect(
      fetchUsers(),
      [],
    );

  
    return (
    <div className="wrapper">
      <h1>Users</h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
      <AddUserForm setError={setError} fetchUsers={fetchUsers}/>
      {users.map((user, index) => (
        <div key={index} className="user-container">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
    );
  }
  
  export default Users;