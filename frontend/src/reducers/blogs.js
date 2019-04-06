import {
  GET_BLOGS,
  GET_BLOG,
  CREATE_BLOG,
  DELETE_BLOG
} from "../actions/types";

const initialState = {
  blogs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload
      };
    case GET_BLOG:
      return {
        ...state,
        blog: action.payload
      };
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload]
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.slug !== action.payload)
      };
    default:
      return state;
  }
}
