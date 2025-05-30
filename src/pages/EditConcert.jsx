// Import necessary React hooks and routing utilities
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditConcert.css";
function EditConcert() {
    // State to store concert data with initial empty values
    const [concert, setConcert] = useState({
        title: "",
        image: "",
        description: "",
        date: "",
        location: "",
        price: 0,  // Initialize price as number
    });

    // Get concert ID from URL parameters
    const { id } = useParams();
    // Get navigation function for redirecting
    const navigate = useNavigate();

    // Fetch concert data when component mounts or ID changes
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/concerts/${id}`)
            .then(res => {
                const concertData = res.data;
                // Convert date to YYYY-MM-DD format for date input
                if (concertData.date) {
                    const dateObj = new Date(concertData.date);
                    concertData.date = dateObj.toISOString().split('T')[0];
                }
                // Update state with fetched concert data
                setConcert(concertData);
            })
            .catch(err => console.log(err));  // Basic error logging
    }, [id]);  // Dependency array - re-run when ID changes

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update concert state while preserving other fields
        setConcert(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form behavior

        // Get JWT token from local storage
        const token = localStorage.getItem('authToken');

        // Configure axios request with auth header
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`  // JWT token in header
            }
        };

        // Send PUT request to update concert
        axios.put(`${import.meta.env.VITE_API_URL}/api/concerts/${id}`, concert, config)
            .then(() => {
                console.log('Concert updated successfully!');
                // Redirect to concert details page after success
                navigate(`/concerts/${id}`);
            })
            .catch(err => {
                console.error('Error updating concert:', err);
                // Handle specific error cases
                if (err.response?.status === 401) {
                    // Unauthorized - redirect to login
                    alert('You need to be logged in to edit concerts');
                    navigate('/login');
                } else {
                    // Generic error message
                    alert('Error updating concert. Please try again.');
                }
            });
    };

    // Form rendering
    return (
        <div className="edit-concert-container">
            <form onSubmit={handleSubmit}>
                <h2>Edit Concert</h2>

                {/* Title Field */}
                <div className="edit-form-group">
                    <label>Title:</label>
                    <input
                        name="title"
                        value={concert.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image URL Field */}
                <div className="edit-form-group">
                    <label>Image URL:</label>
                    <input
                        name="image"
                        value={concert.image}
                        onChange={handleChange}
                    />
                </div>

                {/* Description Field */}
                <div className="edit-form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={concert.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Date Field */}
                <div className="edit-form-group">
                    <label>Date:</label>
                    <input
                        name="date"
                        type="date"
                        value={concert.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Location Field */}
                <div className="edit-form-group">
                    <label>Location:</label>
                    <input
                        name="location"
                        value={concert.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price Field */}
                <div className="edit-form-group">
                    <label>Price (€):</label>
                    <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={concert.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="save-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditConcert;