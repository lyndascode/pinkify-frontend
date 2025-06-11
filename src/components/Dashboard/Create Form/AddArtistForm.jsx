// components/AddArtistForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSubmitArtist from "../../../hooks/useSubmitArtist";
import FormStatus from "./FormStatus";
import { toast } from "react-toastify";

function AddArtistForm() {
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        image: ""
    });

    const [status, submitArtist] = useSubmitArtist();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitArtist(formData).then(() => {
            toast.success("Artist added!");
            setFormData({ name: "", bio: "", image: "" });
            navigate("/");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h4>Add New Artist</h4>

            <input
                type="text"
                placeholder="Artist Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <input
                type="text"
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                required
            />

            <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />

            <button type="submit">Submit</button>
            <FormStatus status={status} />
        </form>
    );
}

export default AddArtistForm;
