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
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

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
