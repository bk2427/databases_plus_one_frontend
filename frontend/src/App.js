import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar';
//import Games from './Components/Games';
import Users from './Components/Users/Users';
import Restaurants from './Components/Restaurants/Restaurants';
import Hello from './Components/Hello/Hello';
import MenuData from './Components/MenuData';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path ="" element={<h1>Home</h1>} />
      {/* <Route path="games" element={<Games />} /> */}
      <Route path ="Restaurants" element={<Restaurants/>} />
      <Route path ="Hello" element={<Hello/>} />
<<<<<<< HEAD
      <Route path ="MenuData" element={<MenuData/>} />

=======
      <Route path="Users" element={<Users/>} />
>>>>>>> 75469670b2dd5fa3cfac31d0d2b2e520ba65204b
    </Routes>
    </BrowserRouter>
  );
}

export default App;
