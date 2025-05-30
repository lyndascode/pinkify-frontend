
import React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);


    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    const authenticateUser = () => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios
                .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    // If the server verifies that JWT token is valid
                    console.log("verification response:", response.data);
                    const user = response.data;
                    // Update state variables
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                    setIsAdmin(user.role === 'admin');

                })
                .catch((error) => {
                    // ADD THIS ERROR LOG
                    console.error("Auth verification failed:", error);
                    if (error) {
                        setAuthError(error.response.data.message);
                        return;
                    }
                    // If the server sends an error response (invalid token)
                    // Update state variables
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                    setIsAdmin(false);
                });
        } else {
            // If the token is not available
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
            setIsAdmin(false);
        }
    };

    const removeToken = () => {
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        removeToken(); //removes the token from localStorage
        authenticateUser(); //Calls authenticateUser() which now finds no token and updates state accordingly

    };

    useEffect(() => { //Right after the app renders, useEffect runs authenticateUser()
        //  This function checks localStorage for a token(like looking for a security badge)

        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
                authError,
                isAdmin,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };