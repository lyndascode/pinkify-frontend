import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ConcertDetails() {
    const { id } = useParams();
    const [concert, setConcert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        </div>
    );
}

export default ConcertDetails;
