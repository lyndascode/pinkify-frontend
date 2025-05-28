import { Link } from "react-router-dom";
import ConcertList from "../components/Concert/ConcertList";
import './SearchBar.css';
import Banner from "../components/Home/Banner";
import PastConcerts from "../components/Home/PastConcerts";
import SearchBar from "../components/Home/SearchBar";
import ArtistList from "../components/Artists/ArtistList";
import AddConcertForm from "../components/Dashboard/AddConcertForm";
import AddArtistForm from "../components/Dashboard/AddArtistForm";
function HomePage() {
    return (
        <div className="homepage">

            <Banner />

            <SearchBar />
            {/* Concerts List */}
            <main className="main-section">
                <h2>Past Concerts</h2>
                <PastConcerts />
                <h2> Upcoming Concerts</h2>
                <ConcertList />
                <h2> Your Artists </h2>
                <ArtistList />
            </main>
        </div>
    );
}

export default HomePage;
