import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddConcertForm from "../Dashboard/Create Form/AddConcertForm";
import AddArtistForm from "../Dashboard/Create Form/AddArtistForm";
import ConcertList from "../Concert/ConcertList";
import ArtistList from "../Artists/ArtistList";
import { AuthContext } from "../../Context/auth.context"; // Direct context import
import './Admin.css';

function AdminPanel() {
    const [activeForm, setActiveForm] = useState(null);
    const { isAdmin, isLoading } = useContext(AuthContext); // Using useContext directly

    if (isLoading) return <p>Loading...</p>;
    if (!isAdmin) return <p>Access denied. Admin privileges required.</p>;

    return (
        <div className="admin-panel">
            <h3 className="admin-section-title">Manage Concerts & Artists</h3>

            {/* List Section */}
            <div className="admin-tabs">
                <button
                    className={activeForm === "concertList" ? "active-tab" : ""}
                    onClick={() => setActiveForm("concertList")}
                >
                    Concerts List
                </button>
                <button
                    className={activeForm === "artistList" ? "active-tab" : ""}
                    onClick={() => setActiveForm("artistList")}
                >
                    Artists List
                </button>
            </div>

            <div className="admin-content">
                {activeForm === "concertList" && <ConcertList adminMode={true} showDeleteButtons={true} />}
                {activeForm === "artistList" && <ArtistList adminMode={true} />}
            </div>

            <h3 className="admin-section-title">Add New Content</h3>

            <div className="admin-tabs">
                <button
                    className={activeForm === "concert" ? "active-tab" : ""}
                    onClick={() => setActiveForm("concert")}
                >
                    New Concert
                </button>
                <button
                    className={activeForm === "artist" ? "active-tab" : ""}
                    onClick={() => setActiveForm("artist")}
                >
                    New Artist
                </button>
            </div>

            <div className="admin-content">
                {activeForm === "concert" && <AddConcertForm />}
                {activeForm === "artist" && <AddArtistForm />}
            </div>
        </div>
    );
}

export default AdminPanel;