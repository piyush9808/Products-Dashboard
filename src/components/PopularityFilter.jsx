// components/PopularityFilter.js
import React from 'react';

const popularityRanges = [
    { label: '0-10000', min: 0, max: 10000 },
    { label: '10000-30000', min: 10000, max: 30000 },
    { label: '30000-50000', min: 30000, max: 50000 },
    { label: '50000+', min: 50000, max: Infinity }
];

const PopularityFilter = ({ selectedPopularityRange, onPopularityChange }) => {
    const handleChange = (range) => {
        if (selectedPopularityRange?.label === range.label) {
            onPopularityChange(null); // Clear selection if double-clicked
        } else {
            onPopularityChange(range);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Popularity Range</h2>
            <div className="space-y-2">
                {popularityRanges.map(range => (
                    <div
                        key={range.label}
                        className="flex items-center cursor-pointer"
                        onClick={() => handleChange(range)}
                        onDoubleClick={() => handleChange(range)} // Handle double-click
                    >
                        <input
                            type="radio"
                            id={range.label}
                            name="popularityRange"
                            checked={selectedPopularityRange?.label === range.label}
                            readOnly
                            className="mr-2"
                        />
                        <label htmlFor={range.label} className="text-gray-700">{range.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularityFilter;
