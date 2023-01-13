const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

//GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});
    response.json(blogs);
});


//POST
blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    //Select random user
    const user = await User.findOne();
    
    //Create new mongoose Blog object and add random user_id as its owner
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });

    //Save blog to database
    const savedBlog = await blog.save();
    
    //Add new blogs id to users blog field
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});


//PUT
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


//DELETE
blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
});

module.exports = blogsRouter;