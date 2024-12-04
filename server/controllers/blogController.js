const Blog = require('../models/blog'); // Blog model
const User = require('../models/user'); // User model

// Fetch blogs for public and authenticated users
exports.getBlogs = async (req, res) => {

  
    try {
        const blog = await Blog.find().populate('author', 'name -_id')
            .populate('comments.user', 'name -_id')

       

        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blogs.' });
    }
};


// Fetch blogs for the logged-in user only
exports.getUserBlogs = async (req, res) => {
    try {
        // Assuming you have middleware that adds the user to req.user
        const blogs = await Blog.find({ author: req.user._id })
            .populate('author', 'name') // Populate author info if needed
            .populate('comments.user', 'name -_id'); // Populate comments if needed
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blogs.' });
    }
};


// Admin: Get all blogs
exports.adminGetAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        console.log(blogs)
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch all blogs.' });
    }
};

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create({ ...req.body, user: req.user.id, author: req.user._id });
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create blog.' });
    }
};

// Like a blog
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        if (blog.likes.includes(req.user.id)) {
            //bug solved type was not matching so converted id into string
            blog.likes = blog.likes.filter((id) => id.toString() !== req.user.id); // Unlike

        } else {
            blog.likes.push(req.user.id); // Like
        }
        console.log("yessssssss")
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Failed to like blog.' });
    }
};

// Comment on a blog
exports.commentBlog = async (req, res) => {

    console.log(req.body.comment)

    try {
        const blog = await Blog.findById(req.params.id);


        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        const comment = blog.comments.push({ user: req.user.id, comment: req.body.comment });

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Failed to comment on blog.' });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        // Allow only the admin or the blog owner to update
        if (blog.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update this blog.' });
        }

        Object.assign(blog, req.body); // Update blog with new data
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update blog.' });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        // Check if the user is the author or an admin




        if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this blog.' });
        }

        // Delete the blog
        await blog.deleteOne();

        res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete blog.' });
    }
};

