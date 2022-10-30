const listHelper = require('../utils/list_helper');

const {listWithOneBlog, listWithManyBlogs}= require('./testBlogs');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
    
    test('when list has multiple blogs equals the likes of all of them', () => {
        const result = listHelper.totalLikes(listWithManyBlogs);
        expect(result).toBe(36);
    });
});

describe('most liked', () => {
    test('when list has only one blog, it is the most liked', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual(
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5
            }
        );
    });

    test('when list has multiple blogs', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs);
        expect(result).toEqual(
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            }
        );
    });
});