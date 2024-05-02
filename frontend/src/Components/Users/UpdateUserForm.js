

import React, { useState } from 'react';
import axios from 'axios';

function UpdateUserForm({ user, onUpdate }) {
    const [newEmail, setNewEmail] = useState('');
  
    const handleEmailChange = (event) => {
      setNewEmail(event.target.value);
    };

    // Log the user object to inspect its structure
    console.log('User object:', user);
    console.log('User id:', user._id);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitting form with new email:', newEmail); // Debugging
      axios.put(`/users/${user._id}/${newEmail}`)
        .then(response => {
          onUpdate(response.data); 
          // Close the modal or handle success as needed
        })
        .catch(error => {
          console.error('Error updating user:', error);
          // Handle error
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="newEmail">New Email:</label>
        <input type="email" id="newEmail" value={newEmail} onChange={handleEmailChange} />
        <button type="submit">Update Email</button>
      </form>
    );
  }
  

export default UpdateUserForm;
