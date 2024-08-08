// components/PriceFilter.js
import React from 'react';

const priceRanges = [
    { label: '0-5000', min: 0, max: 5000 },
    { label: '5000-10000', min: 5000, max: 10000 },
    { label: '10000-20000', min: 10000, max: 20000 },
    { label: '20000+', min: 20000, max: Infinity }
];

const PriceFilter = ({ selectedPriceRange, onPriceChange }) => {
    const handleChange = (range) => {
        if (selectedPriceRange?.label === range.label) {
            onPriceChange(null); // Clear selection if double-clicked
        } else {
            onPriceChange(range);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Price Range</h2>
            <div className="space-y-2">
                {priceRanges.map(range => (
                    <div
                        key={range.label}
                        className="flex items-center cursor-pointer"
                        onClick={() => handleChange(range)}
                        onDoubleClick={() => handleChange(range)}
                    >

                        <input
                            type="radio"
                            id={range.label}
                            name="priceRange"
                            checked={selectedPriceRange?.label === range.label}
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

export default PriceFilter;
