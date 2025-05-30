import { createContext, useState, useContext } from 'react';

// 1. Create Context "Box"
const SearchContext = createContext();

// 2. Create Provider "Wrapper" 
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Simple function to update search term
    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase()); // Store lowercase for consistency
    };

    // 3. Provide these values to children
    return (
        <SearchContext.Provider value={{
            searchTerm,
            handleSearch // Passing the setter function
        }}>
            {children}
        </SearchContext.Provider>
    );
};

// 4. Hook for easy access
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
};