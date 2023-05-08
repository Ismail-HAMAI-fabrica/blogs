import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    const blogPost = new BlogPost({ user_id, title, content });
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog post by ID
router.get('/:id', getBlogPost, (req, res) => {
  res.json(res.blogPost);
});

// Update a blog post by ID
router.patch('/:id', getBlogPost, async (req, res) => {
  if (req.body.user_id != null) {
    res.blogPost.user_id = req.body.user_id;
  }
  if (req.body.title != null) {
    res.blogPost.title = req.body.title;
  }
  if (req.body.content != null) {
    res.blogPost.content = req.body.content;
  }
  try {
    const updatedBlogPost = await res.blogPost.save();
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post by ID
router.delete('/:id', getBlogPost, async (req, res) => {
  try {
    await res.blogPost.remove();
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single blog post by ID
async function getBlogPost(req, res, next) {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (blogPost == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }
    res.blogPost = blogPost;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default router;
