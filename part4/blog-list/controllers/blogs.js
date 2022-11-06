const blogRouter = require('express').Router()
const note = require('../../../part3/fullstack-part3/notes-backend/models/note')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.number
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true })
    response.json(updatedBlog)
})

module.exports = blogRouter