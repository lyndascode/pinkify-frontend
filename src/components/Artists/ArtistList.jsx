import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "./ArtistCard";
import './Artist.css';
import { useSearch } from "../../Context/SearchContext";

function ArtistList({ isAdmin }) {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchTerm } = useSearch();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/artists`)
            .then((res) => {
                setArtists(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading artists:", err);
                setIsLoading(false);
            });
    }, []);

    const handleDeleteFromList = (idToDelete) => {
        const newListArtist = artists.filter((artist) => artist._id !== idToDelete);
        setArtists(newListArtist);
    };
    const filteredArtists = artists.filter((artist) =>
        artist.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="artist-list">
            <div className="artist-list-header">
                <h2>K-pop Artists Spotlight</h2>
                <p>Discover your favorite K-pop stars and rising talents</p>
            </div>

            {isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading artists...</p>
                </div>
            ) : filteredArtists.length === 0 ? (
                <div className="no-artists">
                    <p>No artists found</p>
                    <div className="pinkify-icon">🌟</div>
                </div>
            ) : (
                <div className="artist-grid">
                    {filteredArtists.map((artist) => (
                        <ArtistCard
                            key={artist._id}
                            artist={artist}
                            isAdmin={isAdmin}
                            onDelete={handleDeleteFromList}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ArtistList;