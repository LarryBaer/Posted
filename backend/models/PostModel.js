const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postName:{
    type: String,
    required: true,
  },
  postImage:{
    type: String,
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
