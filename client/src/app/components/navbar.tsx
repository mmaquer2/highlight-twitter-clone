import React from 'react';
import styles from '../../styles/Navbar.module.css';
import '../globals.css'

/*

// navbar

*/




function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/path-to-your-logo.png" alt="Logo" />
      </div>
      <div className={styles.menu}>
        <a href="#">Docs</a>
        <div className={styles.dropdown}>
          <a href="#">Server API</a>
          <div className={styles.dropdownContent}>
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
          </div>
        </div>
        <div className={styles.dropdown}>
          <a href="#">Client API</a>
          <div className={styles.dropdownContent}>
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
          </div>
        </div>
        <a href="#">Ecosystem</a>
        <a href="#">About</a>
      </div>
      <div className={styles.rightMenu}>
        <a href="#">4.x</a>
        <a href="#">English</a>
        <a href="#">Search</a>
      </div>
    </div>
  );
}

export default Navbar;


