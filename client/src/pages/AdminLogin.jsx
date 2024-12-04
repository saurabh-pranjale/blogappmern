import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make login request to the backend
            const response = await axios.post('http://localhost:5000/api/users/login', credentials);

            // Assuming response contains user data and token
            const userData = response.data.user;
            const token = response.data.token;

            // Check if the user is an admin
            if (userData.isAdmin) {
                // Save user data and token in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', token);

                // Redirect to the admin dashboard
                navigate('/admin');
            } else {
                // If the user is not an admin, show an error
                setError('You are not authorized to log in as an admin.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="container w-50 mt-5 p-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
