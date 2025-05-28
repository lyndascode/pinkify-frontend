import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteArtists from "../components/Dashboard/FavoriteArtists";
import FavoriteConcerts from "../components/Dashboard/FavoriteConcerts";
import UserProfile from "../components/Dashboard/UserProfile";
import AdminPanel from "../components/Dashboard/AdminPannel";

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState("favorites");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken'); //to know : is the person connected ? 
        if (!token) {
            navigate('/login'); //If not connected go back to homepage 
            return;
        }

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUserData(res.data))
            .catch((err) => {
                console.error('Error fetching user data:', err);
                navigate('/login');
            });
    }, [navigate]);

    if (!userData) return <p>Loading...</p>;

    const isAdmin = userData.role === "admin";// this is the famous admin access verifier , he lets you see admin if you are one 

    return (
        <div className="section">
            <h2 className="text-center">  Welcome, {userData.name}!</h2>
            <p className="text-center">Manage your profile, favorite concerts, and more.</p>

            {/* Onglets / navigation du dashboard */}
            <nav className="dashboard-nav">
                {  /*favorite button */}
                <button className={activeTab === "favorites" ? "active" : ""} onClick={() => setActiveTab("favorites")}>
                    Favorites
                </button>
                {/*profile button */}
                <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                    Profile
                </button>

                {/* if is an admin let him see the admin board: admin button appear, click and see admin board   */}
                {isAdmin && (
                    <button className={activeTab === "admin" ? "active" : ""} onClick={() => setActiveTab("admin")} >
                        Admin
                    </button>
                )}
            </nav>

            {/* So now here after clicking on the button, what to render ?  */}
            <div className="dashboard-content"> {/* if favorite is clicked, then show this */}
                {activeTab === "favorites" && (
                    <>
                        <FavoriteConcerts favorites={userData.favourites} />
                        <FavoriteArtists favoriteArtists={userData.favoriteArtists} />
                    </>
                )}
                {/* if profile is clicked then render userProfile  */}
                {activeTab === "profile" && <UserProfile user={userData} />}
                {/* if admin is clicked then render adminPannel  */}
                {activeTab === "admin" && isAdmin && <AdminPanel />}
            </div>
        </div>
    );
}

export default Dashboard;
