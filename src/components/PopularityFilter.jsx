import React, { useState } from 'react';

const PopularityFilter = ({ selectedPopularityRange, onPopularityChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(selectedPopularityRange);
    const [clickTimeout, setClickTimeout] = useState(null);

    const popularityRanges = [
        { label: '0-10000', min: 0, max: 10000 },
        { label: '10000-30000', min: 10000, max: 30000 },
        { label: '30000-50000', min: 30000, max: 50000 },
        { label: '50000+', min: 50000, max: Infinity },
    ];

    const handleSelectRange = (range) => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
            if (selectedRange === range) {
                setSelectedRange(null);
                onPopularityChange(null);
                setIsOpen(false);
                return;
            }
        }

        setClickTimeout(setTimeout(() => {
            setSelectedRange(range);
            onPopularityChange(range);
            setIsOpen(false);
        }, 250));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-black border text-white rounded-lg shadow-md hover:bg-gray-800"
            >
                Popularity Range: {selectedRange ? `${selectedRange.label}` : 'Select'}
            </button>
            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-black text-white  border rounded-lg shadow-md">
                    {popularityRanges.map((range) => (
                        <li
                            key={range.label}
                            onClick={() => handleSelectRange(range)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${selectedRange === range ? 'bg-gray-800' : ''}`}
                        >
                            {range.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PopularityFilter;
