import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertCard from "./ConcertCard";
import './Concert.css';

function ConcertList({ isAdmin }) {
    const [concerts, setConcerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/concerts`)
            .then((res) => {
                setConcerts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching concerts:", err);
            })
    }, []);

    const handleDeleteFromList = (idToDelete) => {
        const newListConcert = concerts.filter((concert) => concert._id !== idToDelete);
        setConcerts(newListConcert);
    }

    return (
        <section className="concert-list">
            <div className="concert-list-header">
                <h2>Upcoming K-pop Concerts</h2>
                <p>Stay tuned for the hottest K-pop events coming to your city!</p>
            </div>

            {isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading concerts...</p>
                </div>
            ) : concerts.length === 0 ? (
                <div className="no-concerts">
                    <p>No upcoming concerts found</p>
                    <div className="pinkify-icon">🎤</div>
                </div>
            ) : (
                <div className="concert-grid">
                    {concerts.map((concert) => (
                        <ConcertCard
                            key={concert._id}
                            concert={concert}
                            isAdmin={isAdmin}
                            onDelete={handleDeleteFromList}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ConcertList;