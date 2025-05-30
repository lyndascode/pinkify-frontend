// src/components/FavoriteArtists.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteArtistCard from "./FavoriteArtistCard";
import ArtistCard from "../../Artists/ArtistCard";
import './Favorite.css';


//here the function responsible for displaying favorites artists in dashboard 


function FavoriteArtists() {
    const [favoriteArtists, setFavoriteArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/favorites/artists`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setFavoriteArtists(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching favorite artists:", err);
                setError("Could not load your favorite artists");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading favorite artists...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="favorite-artists-widget">
            <h3>  Your Favorite Artists</h3>
            {favoriteArtists.length === 0 ? (
                <p>No favorite artists yet.</p>
            ) : (
                <div className="widget-card">
                    <ul>
                        {favoriteArtists.map((artist) => (
                            <div className="favorite-card" key={artist._id}>
                                <ArtistCard artist={artist} />
                            </div>
                        ))}
                    </ul>
                </div>

            )}
        </div>
    );
}

export default FavoriteArtists;
