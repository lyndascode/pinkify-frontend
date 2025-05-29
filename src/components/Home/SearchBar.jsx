import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Call the onSearch prop with the current search term
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section className="search-block">
            <input
                type="text"
                placeholder="Search by artist or city..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
        </section>
    );
}

export default SearchBar;