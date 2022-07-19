import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { allHeroes } from '../Assets/AllHeroes';
function Header({ favorito }) {
  const [buscarPersonagem, setBuscarPersonagem] = useState(null);
  const navigate = useNavigate();

  const buscar = (event) => {
    event.preventDefault();
    navigate(`/lista/${buscarPersonagem}`);
    document.getElementById('headerAutocomplete').blur();
  };

  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>
        <h2>bH4money,</h2>
        <h1>Heroes</h1>
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
          sx={{ color: 'primary.main' }}
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
        <Link to={'/'}>Ínicio Rápido</Link>
        <Link to={favorito ? `/heroi/${favorito}` : '/home/1'}>
          Herói Favorito
        </Link>
      </nav>
    </header>
  );
}

export default Header;
