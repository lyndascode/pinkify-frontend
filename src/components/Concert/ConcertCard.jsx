import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // npm install react-icons
import './Concert.css';
import { FaTrashAlt } from "react-icons/fa";


function ConcertCard({ concert, isAdmin, onDelete }) {
    // const [concert, setConcert] = useState([]); //we want to ask the parent to delete this card not the card to delete itself so no useState here 
    const [isFavorited, setIsFavorited] = useState(false);

    const handleAddToFavorites = () => {
        const token = localStorage.getItem("authToken");

        axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/favorites/concerts/${concert._id}`,
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
        console.log("Concert ID used in delete:", concert._id);
        axios.delete(`${import.meta.env.VITE_API_URL}/api/concerts/${concert._id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log({ message: "this is res:", res });

                {/*we already filtered the new list to let just the concerts that wont be deleted, now we should update with onDelete with asking parent  ? */ }
                onDelete(concert._id);//asks the parent to delete me from the list 

            })
            .catch((err) => {
                console.error("Error deleting:", err);
            });

    }
    console.log(concert)

    console.log(concert.image)

    return (
        <div className="concert-card">



            <img src={concert.image} alt={concert.title} /> {/*  i did console log its not empty , ConcertCard.jsx:55 An empty string ("") was passed to the src attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to src instead of an empty string. */}
            <div className="concert-info">
                <h3>{concert.title}</h3>
                <p className="concert-location">📍 {concert.location}</p>
                <p className="concert-date">🗓 {new Date(concert.date).toLocaleDateString()}</p>
                <p className="concert-price">{concert.price} €</p>

                <Link to={`/concerts/${concert._id}`} className="concert-link">
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

export default ConcertCard;






