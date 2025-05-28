import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteConcertCard from "./FavoriteConcertCard";

function FavoriteConcerts() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            setError("No token found. Please login.");
            setIsLoading(false);
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/api/users/favorites/concerts`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                setFavorites(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading favorite concerts:", err);
                setError("Failed to load favorite concerts.");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading concerts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="favorite-concerts">
            <h2>Favorite Concerts</h2>
            <p>Revivez les meilleurs lives de vos idols préférés !</p>

            <div className="favorite-grid">
                {favorites.map((concert) => (
                    <div className="favorite-card" key={concert._id}>
                        <FavoriteConcertCard concert={concert} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FavoriteConcerts;
