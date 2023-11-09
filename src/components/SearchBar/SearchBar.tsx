// src/components/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void; // The type for the onSearch prop
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
        placeholder="Search for a city..."
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
