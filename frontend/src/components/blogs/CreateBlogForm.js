import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBlog } from "../../actions/blogs";

class CreateBlogForm extends Component {
  state = {
    title: "",
    body: ""
  };

  static propTypes = {
    createBlog: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { title, body } = this.state;
    const blog = { title, body };
    this.props.createBlog(blog);
    this.props.history.push("/");
  };

  render() {
    const { title, body } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
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
