import axios from "axios";
import { GET_BLOGS, GET_BLOG } from "./types";

export const getBlogs = () => dispatch => {
  axios
    .get("http://localhost:8000/api/blogs/")
    .then(res => {
      dispatch({
        type: GET_BLOGS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getBlog = slug => dispatch => {
  axios
    .get(`http://localhost:8000/api/blogs/${slug}/`)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
