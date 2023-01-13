const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'All your computers are belong to us',
        author: 'Martin Memer',
        url: 'www.evil.com',
        likes: 3
    },
    {
        title: 'How to become a FullStackBob',
        author: 'Bobrosky Ross',
        url: 'www.twitch.com/bobross',
        likes: 18
    },
    {
        title: 'Crime dont pay, deving does',
        author: 'FullStacks Bob',
        url: 'www.howtomakemoney.com',
        likes:1
    },
];

const initialUsers = [
    {
      username: 'GobtheBoon',
      name: 'Martin Memer',
      password: 'bananaynay'
    },
    {
      username: 'FullStackBob',
      name: 'Bobrosky Ross',
      password: 'bobross!'
    },
    {
      username: 'FullStacksKimmo',
      name: 'Kimmo',
      password: 'kimmokinkku123'
    },
  ];

  
const usersInDb = async () => {
	users = await User.find({});
	return users.map(user => user.toJSON());
};

const blogsInDb = async () => {
    blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

module.exports = {
  initialUsers, initialBlogs, usersInDb, blogsInDb
}