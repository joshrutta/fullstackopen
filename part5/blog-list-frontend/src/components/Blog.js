import React from 'react'

const Blog = ({ blog, handleDeleteBlog }) => (
    <div>
        {blog.title} {blog.author} <button onClick={handleDeleteBlog}>delete</button>
    </div>
)

export default Blog