// src/components/NavBar/NavBar.tsx
import React from 'react';
import styles from './NavBar.module.css';
import Clock from '../Clock/Clock'; // Import the Clock component

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <a href="/">Home</a>
        {/* Other navigation links */}
      </div>
      <div>
        <Clock />
      </div>
    </nav>
  );
};

export default NavBar;
