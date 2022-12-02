import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [messageType, setMessageType] = useState('')
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs => {
            const blogsToRender = blogs.filter(blog => blog.user)//.filter(blog => blog.user === user.id)
            setBlogs(blogsToRender)
            // setBlogs(blogs)
        })
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessageType('error')
            setMessage('Wrong username or password')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const handleCreateNewBlog = async (event) => {
        event.preventDefault()

        const newBlog = { title, author, url }

        try {
            const newlyAddedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(newlyAddedBlog))
            setMessage(`a new blog "${title}" by ${author} added`)
            setMessageType('success')
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            setMessageType('error')
            setMessage('Error adding new blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleDeleteBlog = async (event, blogId) => {
        try {
            const response = await blogService.remove(blogId)
            console.log(response);
            setBlogs(blogs.filter(blog => blog.id !== blogId))
            setMessage(`a blog ${title} by ${author} was deleted`)
            setMessageType('success')
        } catch (exception) {
            setMessageType('error')
            setMessage('Error deleting blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const createNewBlogForm = () => (
        <form onSubmit={handleCreateNewBlog}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">create</button>
        </form>
    )

    return (
        <div>
            <Notification messageType={messageType} message={message} />
            {user === null ?
                <div>
                    <h2>Log in to application</h2>
                    {loginForm()}
                </div>
                :
                <div>
                    <h2>Blogs</h2>

                    <p>{user.name} logged in</p>

                    <h2>Create New</h2>
                    {createNewBlogForm()}
                    <br />
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} handleDeleteBlog={(event) => handleDeleteBlog(event, blog.id)} />
                    )}

                    <button onClick={() => {
                        window.localStorage.removeItem('loggedNoteappUser')
                        setUser(null)
                    }}>
                        logout
                    </button>
                </div>}
        </div>
    )
}

export default App