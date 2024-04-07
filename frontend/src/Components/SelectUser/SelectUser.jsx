import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SelectUser() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get('email');
  
    return (
      <div>
        <h2>User Email: {userEmail}</h2>
        {/* Display other details using userEmail */}
      </div>
    );
  }
  
  export default SelectUser;