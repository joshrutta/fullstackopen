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
            <div style={{...blogStyle, ...hideWhenVisible}}>
                {blog.title} <button onClick={toggleExpand}>view</button> 
            </div>
            <div style={{ ...blogStyle, ...showWhenVisible }}>
                <div>
                    {blog.title}<button onClick={toggleExpand}>hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes} <button onClick={handleLike}>like</button>
                </div>
                <div>
                    {blog.author}
                </div>
                <button onClick={handleDeleteBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog