import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {

    const [credentials, setCredentials] = useState({ title: '', content: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const token = localStorage.getItem('token')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/blogs/', credentials,{headers:{Authorization:`Bearer ${token}`}});
      

            // Redirect to the profile page or dashboard after successful login
            navigate('/blogs'); // Change this to your preferred route after login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

  return (
    <div className="container  w-50 mt-5 p-4">
            <h2>Create Blog 🅱</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <label>title</label>

                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label> content</label>
                    <textarea
                        type="text"
                        name="content"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
  )
}

export default CreateBlog