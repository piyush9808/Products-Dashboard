// components/SortingOptions.js
import React from 'react';

const SortingOptions = ({ sortBy, onSortChange }) => {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Sort By</h2>
            <select
                value={sortBy}
                onChange={handleSortChange}
                className="p-2 border border-gray-300 rounded-lg"
            >
                <option value="">Select...</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity-asc">Popularity: Low to High</option>
                <option value="popularity-desc">Popularity: High to Low</option>
            </select>
        </div>
    );
};

export default SortingOptions;
