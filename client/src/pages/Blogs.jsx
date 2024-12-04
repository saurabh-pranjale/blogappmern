import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs/');
            setBlogs(response.data);
           
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const token = localStorage.getItem('token');


    const handleLike = async (blogId) => {
        try {
            // Correct the axios request configuration to properly pass the headers
            const res = await axios.put(
                `http://localhost:5000/api/blogs/${blogId}/like`,
                {}, // Empty body (if your API doesn't require any body for this operation)
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
           
            fetchBlogs(); // Refresh blogs after liking
        } catch (error) {
            console.error('Failed to like blog:', error);
        }
    };
    

    const handleComment = async (blogId, comment) => {
        try {
            await axios.post(`http://localhost:5000/api/blogs/${blogId}/comment`, { comment },{
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            fetchBlogs(); // Refresh blogs after commenting
        } catch (error) {
            console.error('Failed to comment on blog:', error);
        }
    };

    return (
        <div className="container">
            <h2>All Blogs</h2>
            <div className="row">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                        onLike={handleLike}
                        onComment={handleComment}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
