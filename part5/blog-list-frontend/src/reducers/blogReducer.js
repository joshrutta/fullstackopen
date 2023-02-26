import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },

    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id);
    },

    updateBlog(state, action) {
      return state
        .map(blog => blog.id === action.payload.id ? action.payload : blog)
        .sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1));
    }
  },
});

export const { setBlogs, appendBlog, removeBlog, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1));
    const blogsToRender = blogs.filter((blog) => blog.user);
    dispatch(setBlogs(blogsToRender));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const likeResponse = await blogService.update(blog.id, updatedBlog);
    dispatch(updateBlog(likeResponse));
  };
};

export default blogSlice.reducer;

//   const createNewBlog = async (blogObject) => {
//     try {
//       blogFormRef.current.toggleVisibility();
//       const newlyAddedBlog = await blogService.create(blogObject);
//       setBlogs(blogs.concat(newlyAddedBlog));
//       dispatch(
//         notify(
//           "success",
//           `a new blog "${blogObject.title}" by ${blogObject.author} added`,
//           5
//         )
//       );
//     } catch (exception) {
//       dispatch(notify("error", "Error adding new blog", 5));
//     }
//   };
