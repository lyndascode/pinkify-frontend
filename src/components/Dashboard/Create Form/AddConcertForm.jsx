import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateForm.css';
import { toast } from "react-toastify";
import useSubmitConcert from "../../../hooks/useSubmitConcert";
import FormStatus from "./FormStatus";


function AddConcertForm() {
    const [formData, setFormData] = useState({
        title: "", description: "", date: "", location: "",
        image: "", price: "", capacity: ""
    });

    const navigate = useNavigate();
    const [status, submitConcert] = useSubmitConcert();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitConcert(formData).then(() => {
            toast.warning("Concert added!");
            setFormData({ title: "", description: "", date: "", location: "", image: "", price: "", capacity: "" });
            navigate("/");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h4>Add New Concert</h4>

            {/* Tous les inputs */}
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
