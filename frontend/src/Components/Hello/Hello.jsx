import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const HELLO_ENDPOINT = `${BACKEND_URL}/hello`;


function Hello() {
  const [error, setError] = useState('');
 

  const [Hello, setHello] = useState("");


  useEffect(
    () => {
      axios.get(HELLO_ENDPOINT)
        .then((response) => {
          console.log(response);
          setHello(response.data);
        })

        .catch((error) => {
          console.error(error);
          setError(`Something went wrong: ${error.message}`);
        });
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

