import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function RestInfoPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get('ID');
  const [RestData, setRestData] = useState(null);

  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/restaurants');
        const RestData = response.data.DATA;
        const Restaurant = Object.values(RestData).find(Restaurant => Restaurant._id === ID);
        setRestData(Restaurant);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (ID) {
      fetchRestData();
    }
  }, [ID]);

  return (
    <div>
      {RestData ? (
        <div>
          <h2>User Data</h2>
          <p>Password: {RestData.name}</p>
          {/* Add additional fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RestInfoPage;
