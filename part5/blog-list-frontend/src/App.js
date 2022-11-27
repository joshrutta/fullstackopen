import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
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
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
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

    return (
        <div>
            <Notification message={errorMessage} />
            {user === null ?
                <div>
                    <h2>Log in to application</h2>
                    {loginForm()}
                </div>
                :
                <div>
                    <h2>Blogs</h2>

                    <p>{user.name} logged in</p>

                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
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