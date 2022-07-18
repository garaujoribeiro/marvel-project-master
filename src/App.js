import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './App.css';
import { CssBaseline } from '@mui/material';
import Heroi from './Components/Heroi';
function App() {
  return (
    <main>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/heroi/:id'} element={<Heroi />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
