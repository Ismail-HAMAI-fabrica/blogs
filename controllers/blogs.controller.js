// Import dependencies
const BlogPost = require('../models/blogs.model');
const express = require('express');
const User = require('../models/user.model');

const blogRouter = express.Router();


// Set up multer upload configuration
blogRouter.post('/addblogs', async (req, res)  => {
  try {

    const user_id = req.user.id
    // Extract the necessary data from the request body
    const user = await User.findById(user_id);

    const username =  user.username;

    const {title , content , } = req.body;
    console.log(user_id);
    // Create a new instance of the BlogPost model with the provided data
    const newBlogPost = new BlogPost({
      user_id,
      title,
      content,
      username
    });

    // Save the new blog post to the database
    const savedBlogPost = await newBlogPost.save();

    // Return the saved blog post in the response
    res.json(savedBlogPost);
  } catch (error) {
    // Handle any errors that occur during the saving process
    res.status(500).json({ error: 'An error occurred while creating the blog post.' });
  }
});


// Get all blog posts
blogRouter.get('/allblogs', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog post by ID
blogRouter.get('/blogs/:id', getBlogPost, (req, res) => {
  res.json(res.blogPost);
});

// Update a blog post by ID
blogRouter.patch('/udateblog/:id', getBlogPost, async (req, res) => {
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
blogRouter.delete('/deleteblogs/:id', getBlogPost, async (req, res) => {
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

module.exports = blogRouter;
