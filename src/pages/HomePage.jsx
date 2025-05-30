import { Link } from "react-router-dom";
import ConcertList from "../components/Concert/ConcertList";
import './SearchBar.css';
import Banner from "../components/Home/Banner";
import PastConcerts from "../components/Home/PastConcerts";
import SearchBar from "../components/Home/SearchBar";
import ArtistList from "../components/Artists/ArtistList";
import { useState } from "react";
import { useSearch } from "../Context/SearchContext"
import AddConcertForm from "../components/Dashboard/Create Form/AddConcertForm";
import AddArtistForm from "../components/Dashboard/Create Form/AddArtistForm";
function HomePage() {

    const { searchTerm, handleSearch } = useSearch(); // Get search tools

    return (
        <div className="homepage">
            <Banner />
            <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch */}

            <main className="main-section">
                <PastConcerts searchTerm={searchTerm} />
                <ConcertList searchTerm={searchTerm} />
                <ArtistList searchTerm={searchTerm} />
            </main>
        </div>
    );
}

export default HomePage;
