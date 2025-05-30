import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './AuthForm.css';
function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "", role: "user" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/login`, formData)
            .then((res) => {
                const token = res.data.authToken;
                localStorage.setItem("authToken", token);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error("Login failed:", err);
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message); // Better: show backend error
                } else {
                    setErrorMessage("Login failed. Please try again.");
                }
            });
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}


                <button type="submit" className="submit-btn">Log In</button>
            </form>
            <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <p className="mt-10 mb-2">Don’t have an account yet?</p>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default LoginForm;