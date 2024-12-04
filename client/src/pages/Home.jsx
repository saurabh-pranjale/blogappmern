import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <h1>Welcome to the Blog Platform</h1>
            <p>Explore our latest blogs and share your thoughts.</p>
            <Link to="/blogs" className="btn btn-primary">View Blogs</Link>
        </div>
    );
};

export default Home;
