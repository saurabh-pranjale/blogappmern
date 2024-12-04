import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const [credentials, setCredentials] = useState({ username: '', email: '' });
    const [error, setError] = useState('');

   

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const id = 2

    const token = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/admin/users/${id}`, { headers: { authorization: `Bearer ${token}` } });
        

            // Redirect to the profile page or dashboard after successful login
            navigate('/admin'); // Change this to your preferred route after login

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="container">
            <h2>Update</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>



          
        </div>
    );
};

export default EditUser;