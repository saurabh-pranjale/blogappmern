import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
    );
};

export default UserCard;
