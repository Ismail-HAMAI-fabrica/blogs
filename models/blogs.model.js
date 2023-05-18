// Import dependencies
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Define schema
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  user_id: { type:ObjectId,required:true },

  username: { type: String},

  title: { type: String, required: true },

  content: { type: String, required: true },

  date_added: { type: Date, default: Date.now }
});

// Create model from schema
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Export model
module.exports = BlogPost;
