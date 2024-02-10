import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

function AddGameForm({ setError, fetchGames, cancel, visible }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setNumber(event.target.value); };

  const addGame = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/users', { name: name, numPlayers: number }) // sends a post request
    .then(() => {
      setError('');
      fetchGames();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };

  return(
    <form>
        <label htmlFor="name"> 
          Name
        </label>
        <input type="text" id="name" value={name} onChange={changeName}/>
        <label htmlFor="name"> 
          Number
        </label>
        <input type="number" id="number" value={number} onChange={changeNumber}/>
        <button type="submit" onClick={addGame}>Submit</button>
        <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}


AddGameForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchGames: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function Games() {
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);


  const fetchGames = () => {
    axios.get('http://localhost:8000/users')
    .then((response) => {
      const gamesObject = response.data.Data;
      const keys = Object.keys(gamesObject);
      const gamesArray = keys.map((key) => gamesObject[key]);
      setGames(gamesArray);
      console.log(response);
    }) // something good
    .catch(() => { setError('Something went wrong'); }); //something bad
  };



  useEffect(
    fetchGames,
    [],
  );

  return (
  <div className="wrapper">
    <h1>
      Games - but new
    </h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
    <AddGameForm setError={setError}fetchGames={fetchGames}/>
    {games.map((game) => (
      <div className="game-container">
        <h2>{game.user_name}</h2>
      </div>
    ))}
  </div>
  );
}

export default Games;