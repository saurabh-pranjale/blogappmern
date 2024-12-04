import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store the logged-in user
    const [loading, setLoading] = useState(true); // Track loading state

    const navigate = useNavigate();

    // Axios default configuration
    const api = axios.create({
        baseURL: '/api',
        headers: { 'Content-Type': 'application/json' },
    });

    // Function to log in a user
    const login = async (credentials) => {
        try {
            const response = await api.post('/users/login', credentials);
            const data = response.data;

            localStorage.setItem('user', JSON.stringify(data)); // Save user to localStorage
            setUser(data);
            navigate('/'); // Redirect to the homepage
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            throw error;
        }
    };

    // Function to register a user
    const register = async (userData) => {
        try {
            const response = await api.post('/users/register', userData);
            const data = response.data;

            localStorage.setItem('user', JSON.stringify(data)); // Save user to localStorage
            setUser(data);
            navigate('/'); // Redirect to the homepage
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            throw error;
        }
    };

    // Function to log out a user
    const logout = () => {
        localStorage.removeItem('user'); // Remove user from localStorage
        setUser(null);
        navigate('/login'); // Redirect to the login page
    };

    // Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Stop loading once user is checked
    }, []);

    // Provide context values
    const value = { user, loading, login, register, logout };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
