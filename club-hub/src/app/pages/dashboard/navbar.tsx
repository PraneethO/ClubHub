import React, { useState } from 'react';
import styles from './navbar.module.css';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleClick = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        }
    };

    const handleInputFocus = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        }
    };

    const handleInputBlur = () => {
        if (searchValue === '') {
            setIsExpanded(false);
        }
    };

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className={`${styles.searchBar} ${isExpanded ? styles.expanded : ''}`}>
            <input
                id="search"
                type="search"
                placeholder="Search..."
                required
                tabIndex={isExpanded ? 0 : -1}
                className={`${styles.searchInput} ${
                    !isExpanded ? styles.nonExpanded : ''
                }`}
                onClick={handleClick}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
            />
            {isExpanded && (
                <button className={`${styles.searchButton} ${isExpanded ? styles.appear : ''}`} type="submit">
                    <FaSearch />
                </button>
            )}
        </div>
    );
}
