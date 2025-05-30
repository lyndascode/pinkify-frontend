import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../Context/auth.context';

import "./ConcertDetail.css";

function ConcertDetails() {

    const { id } = useParams();
    const [concert, setConcert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isAdmin, user } = useContext(AuthContext);
    // isAdmin = true (if role was 'admin')



    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/concerts/${id}`)
            .then((res) => {
                setConcert(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching concert:", err);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <p>Loading concert...</p>;
    if (!concert) return <p>Concert not found</p>;

    return (
        <div className="concert-details">


            <h1>{concert.title}</h1>
            <img src={concert.image} alt={concert.title} style={{ width: "300px" }} />
            <p><strong>Description:</strong> {concert.description}</p>
            <p><strong>Date:</strong> {new Date(concert.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {concert.location}</p>
            <p><strong>Price:</strong> {concert.price}€</p>
            <p><strong>Capacity:</strong> {concert.capacity}</p>
            <p><strong>Tickets Sold:</strong> {concert.ticketsSold}</p>



            {isAdmin && (
                <div className="concert-actions" style={{ marginTop: "20px" }}>
                    <Link to={`/concerts/edit/${id}`} className="edit-button">
                        Edit Concert
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ConcertDetails;