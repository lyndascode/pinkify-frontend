import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ArtistDetail.css'
function ArtistDetails() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/artists/${id}`)
            .then((res) => {
                setArtist(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching artist:", err);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <p>Loading artist...</p>;
    if (!artist) return <p>Artist not found.</p>;

    return (
        <div className="artist-details">
            <h1>{artist.name}</h1>
            <img src={artist.image} alt={artist.name} style={{ width: "250px" }} />
            <p><strong>Genre:</strong> {artist.genre}</p>
            <p><strong>Description:</strong> {artist.bio}</p>

            <p> {artist.socialLinks && (
                <div>
                    {artist.socialLinks.instagram && (
                        <p>
                            Instagram: <a href={artist.socialLinks.instagram} target="_blank" rel="noreferrer">{artist.socialLinks.instagram}</a>
                        </p>
                    )}
                    {artist.socialLinks.youtube && (
                        <p>
                            YouTube: <a href={artist.socialLinks.youtube} target="_blank" rel="noreferrer">{artist.socialLinks.youtube}</a>
                        </p>
                    )}
                </div>
            )}</p>
        </div>
    );
}

export default ArtistDetails;
