const blogRouter = require("express").Router();
const Blog = require("../models/blog");
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.number,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    if (!user) {
      return response.status(404).json({ error: "user no longer exists" });
    }
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(403)
        .json({ error: "user can only delete their own blog posts" });
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put("/:id", async (request, response) => {
  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
