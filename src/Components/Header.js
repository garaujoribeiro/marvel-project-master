import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { allHeroes } from './AllHeroes';
function Header() {
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>
        <h2>bH4money,</h2>
        <h1>Heroes</h1>
      </Link>
      <Autocomplete
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
      <nav className={styles.nav}>
        <Link to={'/'}>Ínicio Rápido</Link>
        <Link to={'/'}>Herói Favorito</Link>
      </nav>
    </header>
  );
}

export default Header;
