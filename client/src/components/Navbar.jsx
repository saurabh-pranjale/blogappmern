import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    function remove() {
        // Remove token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to the login page
        if(!localStorage.getItem('token')){
            return navigate('/login');
        }
        
    }

    return (
        <nav className="navbar bg-dark">
            <Link to="/">Home</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/profile">Profile</Link>
            <Link onClick={remove}>LogOut</Link>
        </nav>
    );
};

export default Navbar;
