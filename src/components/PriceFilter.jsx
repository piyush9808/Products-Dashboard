// components/PriceFilter.js
import React, { useState } from 'react';

const PriceFilter = ({ selectedPriceRange, onPriceChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(selectedPriceRange);
    const [clickTimeout, setClickTimeout] = useState(null);

    const priceRanges = [
        { label: '0-5000', min: 0, max: 5000 },
        { label: '5000-10000', min: 5000, max: 10000 },
        { label: '10000-20000', min: 10000, max: 20000 },
        { label: '20000+', min: 20000, max: Infinity },
    ];

    const handleSelectRange = (range) => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
            if (selectedRange === range) {
                setSelectedRange(null);
                onPriceChange(null);
                setIsOpen(false);
                return;
            }
        }

        setClickTimeout(setTimeout(() => {
            setSelectedRange(range);
            onPriceChange(range);
            setIsOpen(false);
        }, 250)); 
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
            >
                Price Range: {selectedRange ? `${selectedRange.label}` : 'Select'}
            </button>
            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    {priceRanges.map((range) => (
                        <li
                            key={range.label}
                            onClick={() => handleSelectRange(range)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedRange === range ? 'bg-gray-200' : ''}`}
                        >
                            {range.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PriceFilter;
