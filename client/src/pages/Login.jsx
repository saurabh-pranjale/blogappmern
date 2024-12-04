import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', credentials);
            const userData = response.data.user; // Assuming the response contains the user data
            const token = response.data.token;   // Assuming the response contains a token

            // Save user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            // Redirect to the profile page or dashboard after successful login
            navigate('/blogs'); // Change this to your preferred route after login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="container  w-50 mt-5 p-4">
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
};

export default Login;
