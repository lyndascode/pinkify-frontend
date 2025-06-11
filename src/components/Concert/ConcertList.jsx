import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ConcertCard from "./ConcertCard";
import './Concert.css';
import { useSearch } from '../../Context/SearchContext';
import { AuthContext } from "../../Context/auth.context"; // Direct context import
function ConcertList({ showDeleteButtons = false }) {

    const { isAdmin } = useContext(AuthContext);
    const [concerts, setConcerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchTerm } = useSearch(); //to use searchbar context 



    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/concerts`)
            .then((res) => {
                setConcerts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching concerts:", err);
                setIsLoading(false);
            })
    }, []);

    const handleDeleteFromList = (idToDelete) => {
        const newListConcert = concerts.filter((concert) => concert._id !== idToDelete);
        setConcerts(newListConcert);
    }
    const filteredConcerts = concerts.filter(concert =>
        concert.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            ) : filteredConcerts.length === 0 ? (
                <div className="no-concerts">
                    <p>No upcoming concerts found</p>
                    <div className="pinkify-icon">🎤</div>
                </div>
            ) : (
                <div className="concert-grid">
                    {filteredConcerts.map((concert) => (
                        <ConcertCard
                            key={concert._id}
                            concert={concert}
                            isAdmin={isAdmin}
                            showDelete={showDeleteButtons}
                            onDelete={handleDeleteFromList}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ConcertList;