import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API call to register the user using axios
            const response = await axios.post('http://localhost:5000/api/users/register', userData);

            // Save the user data to localStorage on successful registration
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirect to the homepage after successful registration
            navigate('/');
        } catch (err) {
            // Set the error message if registration fails
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="container w-50 mt-5 p-4">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
