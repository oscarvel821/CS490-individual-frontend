import React from 'react';
import NavBar from './components/Navbar';
import Landing from './components/Landing';
import Movies from './components/Movies';
import Customers from './components/Customers';
import Report from './components/Report'
import {Routes, Route} from 'react-router-dom'

function App() {

  return(
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </div>
  )
}

export default App;
