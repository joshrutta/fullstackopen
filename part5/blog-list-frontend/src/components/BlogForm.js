import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

// eslint-disable-next-line no-unused-vars
const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        createBlog({
          title,
          author,
          url,
        })
      );
      dispatch(
        notify("success", `a new blog "${title}" by ${author} added`, 5)
      );
    } catch (exception) {
      dispatch(
        notify("error", `Error adding new blog: ${exception.message}`, 5)
      );
    }

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
