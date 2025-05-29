import './AuthForm.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function SignupForm() {

    //Istead of doing this:
    /*   const [name, setName] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState(""); */

    // We can track the whole data coming from db with this: 
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const handleSignup = (e) => {

        e.preventDefault();
        console.log("📦 Sending signup data:", formData);

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
            .then((res) => {
                setMessage("Account created! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
                console.log(" Signup success:", res.data);
            })
            .catch((err) => {
                console.error("Signup error:", err);
                if (err.response && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                }
            });
    };

    return (
        <div className="signup-form-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSignup} className="signup-form">


                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
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
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" className="submit-btn">Sign Up</button>

            </form>




            <p className="mt-10 mb-2">Already have an account?</p>
            <Link className='login-btn' to={"/login"}> Log in</Link>
        </div>

    );
}

export default SignupForm;