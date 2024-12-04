import React, { useState } from 'react';

const BlogCard = ({ blog, onLike, onComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = () => {
        if (newComment.trim() === '') return; // Avoid submitting empty comments
        onComment(blog._id, newComment);
        setNewComment(''); // Clear the comment box after submission
    };

    return (
        <div className="blog-card col-md-4 mb-3 border border-1 border-primary p-2">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Posted by {blog.author?.name}</p> {/* Optional chaining to avoid undefined errors */}
            <button 
                className="btn btn-primary" 
                onClick={() => onLike(blog._id)}>
                Like ({blog.likes.length})
            </button>
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="btn btn-secondary mt-2"
                    onClick={handleCommentSubmit}>
                    Comment
                </button>
            </div>
            <div className="mt-3">
                <h5>Comments</h5>
                {blog.comments?.map((comment, index) => (
                    <p key={index}>
                        <strong>{comment.user?.name}</strong>: {comment.comment}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default BlogCard;
