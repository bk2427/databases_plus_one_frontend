import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Games() {
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);

  useEffect(
    () => {
        axios.get('http://127.0.0.1:8000/') 
            .then((response) => {
            const gamesobjet = response.data.Data;
            const keys = Object.keys(gamesObject);
            const gamesArray = keys.map((key) => gamesobject[key]);
            setgames(gamesArray);
            }) // something good
            .catch(() => { setError('something went wrong'); });
    },
    [],
  );

  return (
    <div className="wrapper">
      <header>
        <h1>
          Games-but new
        </h1>

        {error && ( 
            <div className="error -message">
                {error}
            </div>
        )}

        {Games.map((game) => (
            <div className='game-container'>
                <h2>{game.name}</h2>
                
            </div>
        ))}



        <button type="button" onClick={showAddGameForm}>
          Add a Game
        </button>
      </header>
      <AddGameForm
        visible={addingGame}
        cancel={hideAddGameForm}
        fetchGames={fetchGames}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {games.map((game) => <Game key={game.name} game={game} />)}
    </div>
  );
}

export default Games;