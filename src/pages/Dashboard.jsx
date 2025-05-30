import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteArtists from "../components/Dashboard/Favorite/FavoriteArtists";
import FavoriteConcerts from "../components/Dashboard/Favorite/FavoriteConcerts";
import UserProfile from "../components/Dashboard/UserProfile";
import AdminPanel from "../components/Admin/AdminPanel";
import './Dashoard.css';


function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState("favorites");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUserData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching user data:', err);
                navigate('/login');
            });
    }, [navigate]);

    if (isLoading) return (
        <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Loading your K-pop dashboard...</p>
        </div>
    );

    const isAdmin = userData.role === "admin";

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Welcome back, {userData.name}! <span className="pink-heart">♥</span></h2>
                <p>Manage your K-pop journey with Pinkify</p>
            </div>

            {/* Navigation Tabs */}
            <nav className="dashboard-tabs">
                <button
                    className={`tab-button ${activeTab === "favorites" ? "active" : ""}`}
                    onClick={() => setActiveTab("favorites")}
                >
                    My Favorites
                </button>
                <button
                    className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                >
                    My Profile
                </button>
                {isAdmin && (
                    <button
                        className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
                        onClick={() => setActiveTab("admin")}
                    >
                        Admin Panel
                    </button>
                )}
            </nav>

            {/* Content Area */}
            <div className="dashboard-content">
                {activeTab === "favorites" && (
                    <div className="favorites-container">
                        <FavoriteConcerts />
                        <FavoriteArtists />
                    </div>
                )}
                {activeTab === "profile" && <UserProfile user={userData} />}
                {activeTab === "admin" && isAdmin && <AdminPanel />}
            </div>

        </div>
    );
}

export default Dashboard;