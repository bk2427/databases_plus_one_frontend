import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';


function Hello() {
  const [error, setError] = useState('');
  const [Hello, setHello] = useState([]);


  const fetchHello = () => {
    axios
      .get('hhttp://127.0.0.1:8000/endpoints')
      .then((res) => {
        console.log(res);
        setHello(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(fetchHello,[],);

    return (
        <div className="wrapper">
        <h1>Endpoints</h1>
        {error && (
            <div className="error-message">
            {error}
            </div>
        )}
        {Hello.map((restaurant) => (
            <div className="restaurant-container">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.location}</p>
            </div>
        ))}
        </div>
    );
};



export default Hello;
