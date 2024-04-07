import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function RestInfoPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const restaurantName = searchParams.get('name');
  
    return (
      <div>
        <h2>{restaurantName}</h2>
        {/* Display other details using restaurantName */}
      </div>
    );
  }
  
  export default RestInfoPage;
