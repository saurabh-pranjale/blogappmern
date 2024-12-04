const express = require('express');
const {
   
    createBlog,
    likeBlog,
    commentBlog,
    deleteBlog,
    updateBlog,
    adminGetAllBlogs,
    getBlogs,
    getUserBlogs,
} = require('../controllers/blogController');

const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Public route
router.get('/',getBlogs);

router.get('/user_blogs',protect,getUserBlogs)
// Admin-only route to fetch all blogs
router.get('/admin', protect, admin, adminGetAllBlogs);

// Protected user routes
router.post('/', protect, createBlog);
router.put('/:id/like', protect, likeBlog);
router.post('/:id/comment', protect, commentBlog);

// CRUD routes
router.put('/:id', protect, admin, updateBlog); // Admin or blog owner can update
router.delete('/:id', protect, admin, deleteBlog); // Admin or blog owner can delete

module.exports = router;
