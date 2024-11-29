// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="search-bar"
                />
                <button type="submit" className="search-bar-button">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
