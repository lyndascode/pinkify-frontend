import { useState } from "react";
import axios from "axios";

function useSubmitConcert() {
    const [status, setStatus] = useState("");

    const submitConcert = async (concertData) => {
        const token = localStorage.getItem("authToken");

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/concerts`, concertData, { headers: { Authorization: `Bearer ${token}` }, });
            setStatus("Concert added successfully!");
        }
        catch (err) {
            console.error("Erreur lors de l'ajout:", err);
            setStatus("Failed to add concert.");
        }
    };

    return [status, submitConcert];


}

export default useSubmitConcert;
