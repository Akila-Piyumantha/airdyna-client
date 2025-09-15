import React, { useState } from 'react';
import './dashboard.css';

const Header = ({ onSearchChange, onLogout }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearchChange(e.target.value);
    };

    return (
        <header className="header">
            <div className="header-left">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="header-right">
                <button className="btn-logout" onClick={onLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;
