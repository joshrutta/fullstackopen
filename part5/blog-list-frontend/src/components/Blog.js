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
            <div style={{ ...blogStyle, ...hideWhenVisible }} className='blog'>
                <div data-testid='blog-title'>
                    {blog.title} <button onClick={toggleExpand}>view</button>
                </div>
            </div>
            <div style={{ ...blogStyle, ...showWhenVisible }} className='blog-expanded'>
                <div data-testid='blog-title'>
                    {blog.title}<button onClick={toggleExpand}>hide</button>
                </div>
                <div data-testid='blog-url'>
                    {blog.url}
                </div>
                <div data-testid='blog-likes'>
                    likes {blog.likes} <button onClick={handleLike} data-testid='like-button'>like</button>
                </div>
                <div data-testid='blog-author'>
                    {blog.author}
                </div>
                <button onClick={handleDeleteBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog