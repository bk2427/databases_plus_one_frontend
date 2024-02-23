
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';


function Hello() {
  const [error, setError] = useState('');
 

  const [Hello, setHello] = useState("");


  useEffect(
    () => {
      axios.get('http://127.0.0.1:8000/hello')
        .then((response) => {
          console.log(response);
          setHello(response.data);
        })

        .catch(() => {setError('something went wrong'); });
    },
    [],
  );

  return (
  <div className="wrapper">
    <h1>Hello World Response:</h1>
      <p>hello, {Hello.hello}</p>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
  </div>
  );
}

export default Hello;
