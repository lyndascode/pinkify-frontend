import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateForm.css';
import { toast } from "react-toastify";
import useSubmitConcert from "../../../hooks/useSubmitConcert";
import FormStatus from "./FormStatus";

function AddConcertForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: "",
        price: "",
        capacity: "",
        artists: [], // Added: Array of artist IDs (strings/ObjectIds)
        ticketsSold: 0, // Added: Default to 0
        createdBy: "" // Added: Admin user ID (populate this dynamically)
    });

    const navigate = useNavigate();
    const [status, submitConcert] = useSubmitConcert();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitConcert(formData).then(() => {
            toast.warning("Concert added!");
            setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                image: "",
                price: "",
                capacity: "",
                artists: [],
                ticketsSold: 0,
                createdBy: ""
            });
            navigate("/");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h4>Add New Concert</h4>

            {/* Existing fields */}
            {["title", "description", "location", "image", "price", "capacity"].map((field) => (
                <input
                    key={field}
                    type={field === "price" || field === "capacity" ? "number" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    required={field !== "image"}
                />
            ))}

            {/* New Fields */}
            <input
                type="text"
                placeholder="Artist IDs  "
                value={formData.artists.join(",")} // Assume input is comma-separated IDs
                onChange={(e) =>
                    setFormData({ ...formData, artists: e.target.value.split(",") })
                }
                required
            />

            <input
                type="hidden"
                value={formData.createdBy}

            />

            <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
            />

            <button type="submit">Submit</button>
            <FormStatus status={status} />
        </form>
    );
}

export default AddConcertForm;