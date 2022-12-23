import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        await createNewBlog({
            title, author, url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    id='title'
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                author:
                <input
                    id='author'
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                url:
                <input
                    id='url'
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm