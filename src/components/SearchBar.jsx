import React, { useState } from 'react';
import PopularityFilter from './PopularityFilter';
import PriceFilter from './PriceFilter';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="my-4">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Samsung,Apple,Motorola"
                className="w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2
                 focus:ring-blue-500"
            />

        </div>
    );
};

export default SearchBar;
