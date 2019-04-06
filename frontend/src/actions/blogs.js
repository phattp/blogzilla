import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_BLOGS, GET_BLOG, CREATE_BLOG, DELETE_BLOG } from "./types";

// GET BLOGS
export const getBlogs = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/blogs/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BLOGS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET BLOG
export const getBlog = slug => (dispatch, getState) => {
  axios
    .get(`http://localhost:8000/api/blogs/${slug}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// CREATE BlOG
export const createBlog = blog => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/blogs/", blog, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ createBlog: "Article Created" }));
      dispatch({
        type: CREATE_BLOG,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE BlOG
export const deleteBlog = slug => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/blogs/${slug}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteBlog: "Blog Deleted" }));
      dispatch({
        type: DELETE_BLOG,
        payload: slug
      });
    })
    .catch(err => console.log(err));
};
