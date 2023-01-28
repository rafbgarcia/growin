const httpStatus = require("http-status");
const Post = require("../models/post.model");

exports.create = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(httpStatus.CREATED);
    res.json(savedPost);
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const posts = await Post.list(req.query);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const post = await Post.get(req.params.postId);
    post
      .remove()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(next);
  } catch (error) {
    next(error);
  }
};
