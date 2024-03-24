import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar';
import Users from './Components/Users/Users';
import Restaurants from './Components/Restaurants/Restaurants';
import MenuData from './Components/MenuData';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path ="" element={<h1>Home</h1>} />
      <Route path ="Restaurants" element={<Restaurants/>} />
      <Route path ="MenuData" element={<MenuData/>} />
      <Route path="Users" element={<Users/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
