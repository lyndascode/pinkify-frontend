import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';
import ProfileDropdown from './ProfileDropdown';
function handleLogout() {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
}

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

                <div className="navbar-right">
                    <ProfileDropdown />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

