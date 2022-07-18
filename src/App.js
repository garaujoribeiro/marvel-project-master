import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './App.css';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
function App() {
  const { data, isFetching } = useQuery(
    'herois',
    async () => {
      const response = await axios.get(
        'https://gateway.marvel.com:443/v1/public/characters?apikey=175433ccb801e487f623da18c023d07e',
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60, // 1 hora
    },
  );

  return (
    <main>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path={'/'}
            element={<Home data={data} isFetching={isFetching} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
