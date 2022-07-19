import { Typography } from '@mui/material';
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography variant="body1" component="p">
        Data provided by Marvel. © 2022 MARVEL
      </Typography>{' '}
    </footer>
  );
}

export default Footer;
