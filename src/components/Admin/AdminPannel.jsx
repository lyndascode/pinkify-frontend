import { useState } from "react";
import AddConcertForm from "../Dashboard/Create Form/AddConcertForm";
import AddArtistForm from "../Dashboard/Create Form/AddArtistForm";
import ConcertList from "../Concert/ConcertList";
import ArtistList from "../Artists/ArtistList";
import './Admin.css'


function AdminPanel() {


    const [activeForm, setActiveForm] = useState(null); //  concert  ou  artist 
    const { isAdmin, isLoading } = useContext(AuthContext);


    if (isLoading) return <p>Loading...</p>;

    if (!isAdmin) return <p>Access denied. Admin privileges required.</p>;

    return (
        <div className="admin-panel">
            <h3 className="admin-section-title"> Manage the Concerts & Artists</h3>

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
                {activeForm === "concertList" && <ConcertList isAdmin={true} />} {/* là je suis dans l’espace admin, donc je veux les droits admin. Fais apparaître les boutons delete.*/}
                {activeForm === "artistList" && <ArtistList isAdmin={true} />}
            </div>

            <h3 className="admin-section-title">  Add a New Concert & Artist</h3>


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