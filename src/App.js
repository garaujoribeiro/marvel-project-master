import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './App.css';
import { CssBaseline } from '@mui/material';
function App() {
  const PUBLIC_KEY = '175433ccb801e487f623da18c023d07e';

  const TS = '98546321';

  const HASH =
    'e7c0d207e90436c870bc1a98a0465451d88e37df7d29fefb668fb7b2cdb6f532';

  const BASE_URL = 'https://gateway.marvel.com/v1/public/';

  const [herois, setHerois] = useState(null);

  useEffect(() => fetch(''));

  return (
    <main>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
