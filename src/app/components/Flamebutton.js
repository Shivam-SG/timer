import React from 'react';
import styles from '../css/FlameButton.module.css';

const FlameButton = ({ children, onClick }) => {
  return (
    <button className={styles.flameButton} onClick={onClick}>
      {children}
      <div className={styles.fire}>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
      </div>
    </button>
  );
};

export default FlameButton;
