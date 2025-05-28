import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "./ArtistCard";
function ArtistList() {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    console.log(`${import.meta.env.VITE_API_URL}/api/users/favorites/artists/${artists._id}`);
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/artists`)


            .then((res) => {
                setArtists(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading artists:", err);
                setIsLoading(false);
            });
    }, []);


    const handleDeleteFromList = () => {

    }

    if (isLoading) return <p>Loading artists...</p>;

    return (
        <div className="artist-list">
            {artists.length === 0 ? (
                <p>No artists found</p>
            ) : (
                artists.map((artist) => (
                    <ArtistCard key={artist._id} artist={artist} onDelete={handleDeleteFromList} />
                ))
            )}
        </div>
    );
}

export default ArtistList;
