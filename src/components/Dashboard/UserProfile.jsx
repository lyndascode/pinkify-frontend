import './User.css';
import { logout } from "../../services/auth.services";
import { useNavigate } from 'react-router-dom';
function UserProfile({ user }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();            // Remove the token
        navigate("/login");  // Redirect to login page
    };
    if (!user) return <p>Loading user info...</p>;

    return (
        <div className="user-profile-card">
            <h3> User Information</h3>
            <div className="user-info">
                <div>
                    <span className="label">Name:</span>
                    <p>{user.name}</p>
                </div>
                <div>
                    <span className="label">Email:</span>
                    <p>{user.email}</p>
                </div>
                <div>
                    <span className="label">Role:</span>
                    <p className={`role-tag ${user.role === "admin" ? "admin" : "user"}`}>
                        {user.role}
                    </p>
                </div>
                <div>
                    <span className="label">Account created:</span>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserProfile;
