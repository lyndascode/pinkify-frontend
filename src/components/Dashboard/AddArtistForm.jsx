import { useState } from "react";
import axios from "axios";

function AddArtistForm() {
    const [formData, setFormData] = useState({
        name: "",
        genre: "",
        bio: "",
        image: "",
        socialLinks: {
            instagram: "",
            youtube: ""
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");

        axios.post(`${import.meta.env.VITE_API_URL}/api/artists`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                alert("Artist added!");
                setFormData({
                    name: "",
                    genre: "",
                    bio: "",
                    image: "",
                    socialLinks: { instagram: "", youtube: "" }
                });
            })
            .catch(err => {
                console.error("Error adding artist:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h4>Add New Artist</h4>

            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <input
                type="text"
                placeholder="Genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                required
            />

            <textarea
                placeholder="Biography"
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

            <input
                type="text"
                placeholder="Instagram Link"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                    })
                }
            />

            <input
                type="text"
                placeholder="YouTube Link"
                value={formData.socialLinks.youtube}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                    })
                }
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default AddArtistForm;
