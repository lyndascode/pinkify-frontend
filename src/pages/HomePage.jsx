import { Link } from "react-router-dom";
import ConcertList from "../components/Concert/ConcertList";
import './SearchBar.css';
import Banner from "../components/Home/Banner";
import PastConcerts from "../components/Home/PastConcerts";
import SearchBar from "../components/Home/SearchBar";
import ArtistList from "../components/Artists/ArtistList";
import { useState } from "react";
import AddConcertForm from "../components/Dashboard/Create Form/AddConcertForm";
import AddArtistForm from "../components/Dashboard/Create Form/AddArtistForm";
function HomePage() {

    const [searchQuery, setSearchQuery] = useState(""); // 💡 state to hold live search

    // This function will be passed to SearchBar and called when the user types
    const handleSearch = (query) => {
        setSearchQuery(query); // store the search value
    };



    return (
        <div className="homepage">

            <Banner />

            <SearchBar onSearch={handleSearch} />

            {/* Concerts List */}
            <main className="main-section">
                <h2>Past Concerts</h2>
                <PastConcerts searchQuery={searchQuery} />

                <h2> Upcoming Concerts</h2>
                <ConcertList searchQuery={searchQuery} />

                <h2> Your Artists </h2>
                <ArtistList searchQuery={searchQuery} />
            </main>
        </div>
    );
}

export default HomePage;
