import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import '../Navbar/navbar.css';
import ProfileDropdown from './ProfileDropdown';
import { AuthContext } from "../../context/auth.context"; //   import AuthContext

function Navbar() {
    const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext); // ✅ access auth state

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">Pinkify</Link>
            </div>

            <div className="navbar-links">
                <Link to="/concerts">Concerts</Link>
                <Link to="/artists">Artists</Link>

                {/*   Show if user isnt logged in */}
                {!isLoggedIn && (
                    <>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}

                {/*   Show only when user is logged in */}
                {isLoggedIn && (
                    <div className="navbar-right">
                        <ProfileDropdown />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
