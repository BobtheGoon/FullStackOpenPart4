const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api =supertest(app);
const Blog = require('../models/blog');

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

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[2]);
    await blogObject.save();
});

// const listHelper = require('../utils/list_helper');
// const {listWithOneBlog, listWithManyBlogs}= require('./testBlogs');

//Test for API
describe('root path API calls', () => {
    test('there are 3 blogs currently', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(3);
    });
    
    test('a new blog can be posted', async() => {
        const newBlog = {
            title: 'Testing posting to a bad blog website, an exercise in futility',
            author: 'Tester#69',
            url: 'www.whydoiworkhere.com',
            likes: 2
        };
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const titles = response.body.map(r => r.title);

        expect(response.body).toHaveLength(initialBlogs.length + 1);
        expect(titles).toContain('Testing posting to a bad blog website, an exercise in futility');
    });
});

//Tests for local blogs
// test('dummy returns one', () => {
//     const blogs = [];

//     const result = listHelper.dummy(blogs);
//     expect(result).toBe(1);
// });

// describe('total likes', () => {
//     test('when list has only one blog equals the likes of that', () => {
//         const result = listHelper.totalLikes(listWithOneBlog);
//         expect(result).toBe(5);
//     });
    
//     test('when list has multiple blogs equals the likes of all of them', () => {
//         const result = listHelper.totalLikes(listWithManyBlogs);
//         expect(result).toBe(36);
//     });
// });

// describe('most liked', () => {
//     test('when list has only one blog, it is the most liked', () => {
//         const result = listHelper.favoriteBlog(listWithOneBlog);
//         expect(result).toEqual(
//             {
//                 title: 'Go To Statement Considered Harmful',
//                 author: 'Edsger W. Dijkstra',
//                 likes: 5
//             }
//         );
//     });

//     test('when list has multiple blogs', () => {
//         const result = listHelper.favoriteBlog(listWithManyBlogs);
//         expect(result).toEqual(
//             {
//                 title: 'Canonical string reduction',
//                 author: 'Edsger W. Dijkstra',
//                 likes: 12
//             }
//         );
//     });
// });

afterAll(() => {
    mongoose.connection.close();
});