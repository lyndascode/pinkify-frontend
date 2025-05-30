import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../../Context/SearchContext";
function SearchBar({ onSearch }) {
    const { handleSearch } = useSearch(); // Use context instead of props
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        handleSearch(inputValue); // Send input to context
    };

    return (
        <section className="search-block">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit}>Search</button>

        </section>
    );
}

export default SearchBar;