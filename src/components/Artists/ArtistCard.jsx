import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // npm install react-icons
import { useState } from "react";
import axios from "axios";
import './Artist.css';
import { FaTrashAlt } from "react-icons/fa";


function ArtistCard({ artist, isAdmin, onDelete }) {

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


    const handleDelete = () => {
        const token = localStorage.getItem("authToken"); //for the server to know me 
        console.log("artist ID used in delete:", artist._id);
        axios.delete(`${import.meta.env.VITE_API_URL}/api/artists/${artist._id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log({ message: "this is res:", res });

                {/*we already filtered the new list to let just the artists that wont be deleted, now we should update with onDelete with asking parent  ? */ }
                onDelete(artist._id);//asks the parent to delete me from the list 

            })
            .catch((err) => {
                console.error("Error deleting:", err);
            });

    }


    return (

        <div className="concert-card">


            {artist.image && (
                <img src={artist.image} alt={artist.name} />
            )}

            <div className="concert-info">
                <h3>{artist.name}</h3>
                <p className="concert-location"> {artist.genre}</p>
                <p className="concert-date">{artist.bio}</p>


                <Link to={`/artists/${artist._id}`} className="concert-link">
                    Details
                </Link>


                <button
                    className="favorite-icon"
                    onClick={handleAddToFavorites}
                    aria-label="Add to favorites"
                >
                    {isFavorited ? <FaHeart className="filled" /> : <FaRegHeart />}
                </button>
                {/*if isAdmin true  display the delete button */}
                {isAdmin && (
                    <button onClick={handleDelete} className="delete-icon" aria-label="Delete concert">
                        <FaTrashAlt />
                    </button>
                )}
            </div>
        </div>


    );
}

export default ArtistCard;
