import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleExpand = () => {
    setVisible(!visible);
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (
      window.confirm(
        `Remove "${blog.title}" by ${blog.author}?`
      )
    ) {
      try {
        await dispatch(
          deleteBlog(blog)
        );
        dispatch(
          notify("success", `a blog "${blog.title}" by ${blog.author} was deleted`, 5)
        );
      } catch (exception) {
        dispatch(
          notify("error", `Error deleting blog: ${exception.message}`, 5)
        );
      }
    }
  };

  return (
    <div>
      <div
        id="blog"
        style={{ ...blogStyle, ...hideWhenVisible }}
        className="blog"
      >
        <div data-testid="blog-title">
          {blog.title}{" "}
          <button id="expand-button" onClick={toggleExpand}>
            view
          </button>
        </div>
      </div>
      <div
        id="blog"
        style={{ ...blogStyle, ...showWhenVisible }}
        className="blog-expanded"
      >
        <div data-testid="blog-title">
          {blog.title}
          <button id="hide-button" onClick={toggleExpand}>
            hide
          </button>
        </div>
        <div data-testid="blog-url">{blog.url}</div>
        <div id="likes" data-testid="blog-likes">
          likes {blog.likes}{" "}
          <button
            id="like-button"
            onClick={handleLike}
            data-testid="like-button"
          >
            like
          </button>
        </div>
        <div data-testid="blog-author">{blog.author}</div>
        <button id="remove-button" onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
