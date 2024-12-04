const User = require('../models/user');

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user details (Admin only)
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        user ? res.json(user) : res.status(404).json({ message: 'User not found' });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user (Admin only)


const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
            },
            { new: true }
        );

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};



// Delete a user (Admin only)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        user ? res.json({ message: 'User removed' }) : res.status(404).json({ message: 'User not found' });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllUsers, getUserDetails, updateUser, deleteUser };
