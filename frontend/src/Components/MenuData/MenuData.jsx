import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

function MenuData() {
  const [menuData, setMenuData] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/user_menu';

  useEffect(() => {
    // Fetch menu data when the component mounts
    axios.get(apiUrl)
      .then(response => {
        setMenuData(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>User Menu</h1>
      {menuData ? (
        <div>
          <p><strong>Title:</strong> {menuData.Title}</p>
          <p><strong>Default:</strong> {menuData.Default}</p>
          <p><strong>Choices:</strong></p>
          <ul>
            {Object.keys(menuData.Choices).map(key => (
              <li key={key}>
                {menuData.Choices[key].text} {/* Displaying the text for each choice */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MenuData;
