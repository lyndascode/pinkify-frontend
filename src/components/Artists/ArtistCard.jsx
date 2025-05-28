import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // npm install react-icons
import { useState } from "react";
import axios from "axios";
function ArtistCard({ artist }) {

    const [isFavorited, setIsFavorited] = useState(false);

    const handleAddToFavorites = () => {
        const token = localStorage.getItem("authToken");

        axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/favorites/artists/${artist._id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((res) => {
                console.log("Added to favorites!", res.data);
                setIsFavorited(true);
            })
            .catch((err) => {
                console.error("Error adding to favorites:", err);
            });
    };

    return (
        <div className="card">
            {artist.image && (
                <img src={artist.image} alt={artist.name} />
            )}

            <div className="card-content">
                <h3 className="card-title">{artist.name}</h3>
                <p className="card-subtext"><strong>Genre:</strong> {artist.genre}</p>
                <p className="card-subtext">{artist.bio}</p>

                {artist.socialLinks && (
                    <div className="card-subtext">
                        {artist.socialLinks.instagram && (
                            <p>
                                IG: <a href={artist.socialLinks.instagram} target="_blank" rel="noreferrer">{artist.socialLinks.instagram}</a>
                            </p>
                        )}
                        {artist.socialLinks.youtube && (
                            <p>
                                YouTube: <a href={artist.socialLinks.youtube} target="_blank" rel="noreferrer">{artist.socialLinks.youtube}</a>
                            </p>
                        )}
                    </div>
                )}

                <button
                    className="favorite-icon"
                    onClick={handleAddToFavorites}
                    aria-label="Add to favorites"
                >
                    {isFavorited ? <FaHeart className="filled" /> : <FaRegHeart />}
                </button>
                <Link className="button mt-4" to={`/artists/${artist._id}`}>
                    See Profile
                </Link>
            </div>
        </div>
    );
}

export default ArtistCard;
