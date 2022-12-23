import { useState } from 'react'

const Blog = ({ blog, handleDeleteBlog, handleLike }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleExpand = () => {
        setVisible(!visible)
    }


    return (
        <div>
            <div id='blog' style={{ ...blogStyle, ...hideWhenVisible }} className='blog'>
                <div data-testid='blog-title'>
                    {blog.title} <button id='expand-button'onClick={toggleExpand}>view</button>
                </div>
            </div>
            <div id='blog' style={{ ...blogStyle, ...showWhenVisible }} className='blog-expanded'>
                <div data-testid='blog-title'>
                    {blog.title}<button id='hide-button' onClick={toggleExpand}>hide</button>
                </div>
                <div data-testid='blog-url'>
                    {blog.url}
                </div>
                <div id='likes' data-testid='blog-likes'>
                    likes {blog.likes} <button id='like-button' onClick={handleLike} data-testid='like-button'>like</button>
                </div>
                <div data-testid='blog-author'>
                    {blog.author}
                </div>
                <button id='remove-button' onClick={handleDeleteBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog