import { Link } from "react-router-dom";
import "../Navbar/navbar.css"

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">Pinkify</Link>
            </div>

            <div className="navbar-links">
                <Link to="/concerts">Concerts</Link>
                <Link to="/artists">Artists</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;
