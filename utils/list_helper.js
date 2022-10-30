const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (blogs.length === 1) {
        return blogs[0]['likes'];
    }

    const sumOfLikes = blogs.reduce(
        (acc, currentBlog) => {
            return acc + currentBlog.likes;
        }, 0);

    return sumOfLikes;
};


module.exports = {
    dummy,
    totalLikes
};