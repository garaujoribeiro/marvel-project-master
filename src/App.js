import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Home/Home';
import './App.css';
import { CssBaseline } from '@mui/material';
import Heroi from './Heroi/Heroi';
import DirecionarHome from './Components/Direcionar/DirecionarHome';
import DirecionarHeroi from './Components/Direcionar/DirecionarHeroi';
import ListaBusca from './Home/ListaBusca';
import ListaSection from './Heroi/HeroiComponents/Section/ListaSection';
import theme from './Assets/ThemeProvider';
import { ThemeProvider } from '@mui/material';
function App() {
  const [favorito, setFavorito] = useState(null);
  const [buscarPersonagem, setBuscarPersonagem] = useState(null);

  const handleLocalStorage = useCallback(() => {
    favorito
      ? window.localStorage.setItem('favorito', favorito)
      : setFavorito(window.localStorage.getItem('favorito'));
  }, [favorito]);

  useEffect(() => handleLocalStorage(), [handleLocalStorage]);

  return (
    <main>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header
            favorito={favorito}
            setBuscarPersonagem={setBuscarPersonagem}
            buscarPersonagem={buscarPersonagem}
          />
          <Routes>
            <Route
              path={'/marvel-project-master/lista/:buscarPersonagem'}
              element={<ListaBusca />}
            />
            <Route
              path={'/marvel-project-master/buscar/:nomeHeroi'}
              element={<DirecionarHeroi />}
            />
            <Route
              path={'/marvel-project-master'}
              element={<DirecionarHome />}
            />
            <Route
              path={'/marvel-project-master/home/:pageURL'}
              element={<Home />}
            />
            <Route
              path={'/marvel-project-master/heroi/:id'}
              element={<Heroi favorito={favorito} setFavorito={setFavorito} />}
            />
            <Route
              path={'/marvel-project-master/heroi/:id/:secao/:pageURL'}
              element={
                <>
                  <Heroi favorito={favorito} setFavorito={setFavorito} />
                  <ListaSection />
                </>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </main>
  );
}

export default App;
