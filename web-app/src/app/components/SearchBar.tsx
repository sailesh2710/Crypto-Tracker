// src/components/SearchBar.tsx
'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center bg-white rounded-full shadow px-3 py-2">
      <Search size={20} className="text-black" />
      <input
        type="text"
        className="ml-2 outline-none border-none placeholder-black text-black"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;