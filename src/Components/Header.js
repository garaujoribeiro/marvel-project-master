import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { allHeroes } from '../Assets/AllHeroes';
import Logo from '../Assets/logo.svg';
function Header({ favorito }) {
  const [buscarPersonagem, setBuscarPersonagem] = useState(null);
  const navigate = useNavigate();

  const buscar = (event) => {
    event.preventDefault();
    navigate(`/lista/${buscarPersonagem}`);
    document.getElementById('headerAutocomplete').blur();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </Link>
      <form onSubmit={buscar}>
        <Autocomplete
          id="headerAutocomplete"
          clearOnBlur={true}
          onInputChange={(e, value) => {
            setBuscarPersonagem(value);
          }}
          onChange={(e, value) => {
            navigate(`/buscar/${value}`);
          }}
          className={styles.autocomplete}
          options={allHeroes}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              fullWidth
              {...params}
              label="Busque um herói..."
            />
          )}
        />
      </form>
      <nav className={styles.nav}>
        <Link
          to={`/buscar/${
            allHeroes[Math.floor(Math.random() * allHeroes.length)] // busca um heroi aleatorio
          }`}
        >
          Ínicio Rápido
        </Link>
        <Link to={favorito ? `/heroi/${favorito}` : '/home/1'}>
          Herói Favorito
        </Link>
      </nav>
    </header>
  );
}

export default Header;
