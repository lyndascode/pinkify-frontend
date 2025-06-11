
import { useState } from "react";
import axios from "axios";

function useSubmitArtist() {
    const [status, setStatus] = useState("");

    const submitArtist = async (artistData) => {
        const token = localStorage.getItem("authToken");

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/artists`, artistData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStatus("Artist added successfully!");
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'artiste :", err);
            setStatus("Failed to add artist.");
        }
    };

    return [status, submitArtist];
}

export default useSubmitArtist;
