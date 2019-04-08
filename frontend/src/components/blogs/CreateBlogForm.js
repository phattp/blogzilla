import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBlog } from "../../actions/blogs";

class CreateBlogForm extends Component {
  state = {
    title: "",
    image: "",
    body: ""
  };

  static propTypes = {
    createBlog: PropTypes.func.isRequired
  };

  handleChangeImage = e => this.setState({ image: e.target.files[0] });

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { title, image, body } = this.state;
    const blog = new FormData();
    blog.append("title", title);
    blog.append("image", image, image.name);
    blog.append("body", body);
    this.props.createBlog(blog);
    this.props.history.push("/");
  };

  render() {
    const { title, body } = this.state;
    return (
      <div className="card card-body mt-5 mb-5">
        <h2>Create Article</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              className="form-control-file"
              type="file"
              name="image"
              onChange={this.handleChangeImage}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              type="text"
              name="body"
              onChange={this.onChange}
              value={body}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { createBlog }
)(withRouter(CreateBlogForm));
