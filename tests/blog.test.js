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