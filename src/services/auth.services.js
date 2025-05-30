// src/services/auth.service.js

export const logout = () => {
    localStorage.removeItem("authToken");
};

export const getToken = () => {
    return localStorage.getItem("authToken");
};

export const isLoggedIn = () => {
    return !!getToken();
};
