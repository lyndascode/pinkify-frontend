// SearchContext.js
import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const performSearch = async (term) => {
        setIsSearching(true);
        setSearchTerm(term);

        // Here you would typically make an API call
        // This is just a mock implementation
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Mock results - replace with real API call
            const mockResults = [
                `Result 1 for ${term}`,
                `Result 2 for ${term}`,
                `Result 3 for ${term}`
            ];

            setSearchResults(mockResults);
        } catch (error) {
            console.error("Search failed:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <SearchContext.Provider value={{
            searchTerm,
            searchResults,
            isSearching,
            performSearch,
            setSearchTerm
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    return useContext(SearchContext);
};