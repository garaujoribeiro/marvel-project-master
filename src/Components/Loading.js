import React from 'react';
import logo from '../Assets/loading.svg';
import styles from './Loading.module.css';
function Loading() {
  return (
    <div className={styles.imageContainer}>
      <img src={logo} alt="carregando..." className={styles.loadingImage} />
    </div>
  );
}

export default Loading;
