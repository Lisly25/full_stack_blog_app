const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { config } = require("dotenv");
const { request, response } = require("express");
const userExtractor = require("../utils/middleware").userExtractor;

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: "user missing" });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  blog.likes = blog.likes | 0;
  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  await user.save();

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" });
  }

  await blog.deleteOne();

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString(),
  );

  await user.save();

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.user);

  if (!user) {
    console.log("Received id: ", body.user);
    return response.status(400).send({ error: "incorrect user id" });
  }

  const blog = {
    user: user,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { id: 1, username: 1, name: 1 });
  response.json(updatedBlog);
});

router.post("/:id/comments", async (request, response) => {
  if (request.body.comment.length < 1) {
    console.log("Empyt comment");
    return response.status(400).send({ error: "Empty comments are invalid" });
  }

  const blogId = request.params.id;

  const blog = await Blog.findById(blogId).populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });

  if (!blog) {
    console.log("Received id: ", blogId);
    return response.status(400).send({ error: "invalid blog id" });
  }

  blog.comments.push(request.body.comment);
  const updatedBlog = await blog.save();

  response.status(201).json(updatedBlog);
});

module.exports = router;
