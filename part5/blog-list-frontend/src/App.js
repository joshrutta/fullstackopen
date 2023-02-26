import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { notify } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notify("error", "Wrong username or password", 5));
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  );

  const blogFormRef = useRef();

  const createNewBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>

          {createNewBlogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}

          <button
            id="logout-button"
            onClick={() => {
              window.localStorage.removeItem("loggedBlogAppUser");
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
