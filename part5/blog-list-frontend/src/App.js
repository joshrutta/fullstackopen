import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { notify } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
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
    blogService.getAll().then((blogs) => {
      blogs.sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1));
      const blogsToRender = blogs.filter((blog) => blog.user); //.filter(blog => blog.user === user.id)
      setBlogs(blogsToRender);
      // setBlogs(blogs)
    });
  }, []);

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

  const createNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newlyAddedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newlyAddedBlog));
      dispatch(
        notify(
          "success",
          `a new blog "${blogObject.title}" by ${blogObject.author} added`,
          5
        )
      );
    } catch (exception) {
      dispatch(notify("error", "Error adding new blog", 5));
    }
  };

  const handleDeleteBlog = async (event, blogId) => {
    const blogToBeDeleted = blogs.filter((blog) => blog.id === blogId)[0];
    if (
      window.confirm(
        `Remove "${blogToBeDeleted.title}" by ${blogToBeDeleted.author}?`
      )
    ) {
      try {
        await blogService.remove(blogId);
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        dispatch(
          notify(
            "success",
            `a blog "${blogToBeDeleted.title}" by ${blogToBeDeleted.author} was deleted`,
            5
          )
        );
      } catch (exception) {
        dispatch(notify("error", "Error deleting blog", 5));
      }
    }
  };

  const handleLike = async (event, blogId) => {
    try {
      const blogToBeUpdated = blogs.filter((blog) => blog.id === blogId)[0];
      const updatedBlog = {
        ...blogToBeUpdated,
        user: blogToBeUpdated.user._id,
        likes: blogToBeUpdated.likes + 1,
      };
      // eslint-disable-next-line no-unused-vars
      const { _id, ...updatedBlogExcludingId } = updatedBlog;
      const responseBlog = await blogService.update(
        blogId,
        updatedBlogExcludingId
      );
      var blogsCopy = blogs.filter((blog) => blog.id !== blogId);
      blogsCopy = blogsCopy.concat(responseBlog);
      blogsCopy.sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1));
      setBlogs(blogsCopy);
    } catch (exception) {
      dispatch(notify("error", "Error liking blog", 5));
    }
  };

  const blogFormRef = useRef();

  const createNewBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createNewBlog={createNewBlog} />
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
              handleDeleteBlog={(event) => handleDeleteBlog(event, blog.id)}
              handleLike={(event) => handleLike(event, blog.id)}
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
