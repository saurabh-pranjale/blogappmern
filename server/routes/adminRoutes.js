const express = require('express');
const { protect,admin } = require('../middleware/auth');

const {
    getAllUsers,
    deleteUser,
    getUserDetails,
    updateUser,
  
} = require('../controllers/adminController');

const router = express.Router();

// Admin-only routes
router.get('/users', protect, admin, getAllUsers);
router.get('/users/:id', protect, admin, getUserDetails);
router.delete('/users/:id', protect, admin, deleteUser);
router.put('/users/:id', protect, admin, updateUser);



module.exports = router;
