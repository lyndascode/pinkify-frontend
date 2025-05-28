import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertCard from "./ConcertCard";

function ConcertList({ isAdmin }) {
    //we need usestate because the list of events will change with time
    // so there is a need to store data 
    const [concerts, setConcerts] = useState([]);
    //[concerts] = [  ] ← concerts starts empty
    //  setConcerts(res.data)  <-- fills the box concerts with data fetched by axios
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_URL}/api/concerts`)
            .then((res) => { setConcerts(res.data) })
            .catch((err) => {
                console.error("Error fetching concerts:", err);
            })
    }, []);

    const handleDeleteFromList = (idToDelete) => {

        // we first create a new list WITHOUT the concert that has the matching _id

        const newListConcert = concerts.filter((concert) => concert._id !== idToDelete);// if the concerts id does not match the id we want to delete, then we keep it and add it to newListConcert

        setConcerts(newListConcert); //we update the newlist with each id that is not the one to delete 

    }
    return (
        <section className="section">
            <h2 className="text-center">  Upcoming K-pop Concerts</h2>
            <p className="text-center">Stay tuned for the hottest K-pop events coming to your city!</p>

            {concerts.length === 0 ? (
                <p className="text-center">No concerts found.</p>
            ) : (
                <div className="card-grid">
                    {concerts.map((concert) => (
                        <div key={concert._id}>
                            <ConcertCard concert={concert} isAdmin={isAdmin} onDelete={handleDeleteFromList} /> {/*je  dois passer la même prop que je reçois
                                                                                                                    je  reçois isAdmin, donc je le donne  à chaque carte.*/}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ConcertList;
