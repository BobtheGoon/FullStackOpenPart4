const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url
    };

    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog);
    response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
});

module.exports = blogsRouter;