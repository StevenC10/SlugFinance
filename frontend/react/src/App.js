
// import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Individual from './components/Individual';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/Navbar';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
