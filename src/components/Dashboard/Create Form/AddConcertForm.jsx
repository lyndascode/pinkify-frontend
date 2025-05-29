import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateForm.css';

function AddConcertForm() {
    //formdata, is a box that saves info from the form  and setformdata just updates this box
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: "",
        price: "",
        capacity: ""
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // let react manage
        const token = localStorage.getItem("authToken");// search enter ticket as proof user is connected 
        //post request to bdd create a concert  with infos of formdata
        axios.post(`${import.meta.env.VITE_API_URL}/api/concerts`, formData, {
            headers: { Authorization: `Bearer ${token}` }//give token as proof that user is connected 
        })
            .then(res => {
                alert("Concert  added !"); //if everything well, display concert added 
                setFormData({ title: "", description: "", date: "", location: "", image: "", price: "", capacity: "" }); // reinitialize the form to default values 
                navigate("/") //and go back to homepage 
            })
            .catch(err => {
                console.error("Erreur lors de l'ajout:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h4>Add New Concert</h4>

            <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />

            <input
                type="text"
                placeholder="Description"
                value={formData.description}
                //we want when he writes, info stocked in formData, thats why onchange
                // e => : event of clicking ,description: e.target.value =  what user is tapping put it in description 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />

            <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />

            <input
                type="text"
                placeholder="Location" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />

            <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })} />

            <input
                type="number"
                placeholder="Price" value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />

            <input type="number" placeholder="Capacity" value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required />

            <button type="submit">Submit</button>
        </form>
    );
}

export default AddConcertForm;
