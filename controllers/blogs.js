const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});
    response.json(blogs);
});
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    //Select random user
    const user = await User.findOne();
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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