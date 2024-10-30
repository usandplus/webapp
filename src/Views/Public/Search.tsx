// src/views/SearchView.tsx

import React, { useState } from 'react';
import UNPInput from '../../Components/unp/UNPInput';
import UNPButton from '../../Components/unp/UNPButton';

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Perform search with the query
    console.log('Search query:', query);
  };

  return (
    <div className="search-view">
      <h1>Search</h1>
      <UNPInput
        type="text"
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <UNPButton label="Search" onClick={handleSearch} />
    </div>
  );
};

export default SearchView;
