const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    const authorCount = _.countBy(blogs, blog => blog.author)
    return Object.entries(authorCount)
        .reduce(
            (prev, current) => (prev[1] > current[1]) ? prev[0] : current[0]
        )
}

const mostLikes = (blogs) => {
    // creates object with author name as key and likes as value
    authorByLikes = blogs.reduce(function (r, a) {
        r[a.author] = r[a.author] || 0;
        r[a.author] = r[a.author] + a.likes;
        return r;
    }, Object.create(null));

    authorWithMostLikesArray = Object.entries(authorByLikes)
        .reduce(
            (prev, current) => (prev[1] > current[1]) ? prev : current
        )
    return { 'author': authorWithMostLikesArray[0], 'likes': authorWithMostLikesArray[1] }

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }