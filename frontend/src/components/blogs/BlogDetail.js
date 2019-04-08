import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBlog, deleteBlog } from "../../actions/blogs";

class BlogDetail extends Component {
  static propTypes = {
    user: PropTypes.object,
    blog: PropTypes.object,
    getBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.getBlog(slug);
    window.scrollTo(0, 0);
  }

  onDelete = e => {
    e.preventDefault();
    this.props.deleteBlog(this.props.blog.slug);
    this.props.history.push("/");
  };

  checkOwner() {
    const ownerButton = (
      <div className="col-8">
        <div className="d-flex justify-content-between mb-5">
          <button className="btn btn-warning">Edit</button>
          <button onClick={this.onDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    );

    const { blog } = this.props;
    const { user } = this.props;

    if (!user) {
      return "";
    }

    if (blog.owner === user.username) {
      return ownerButton;
    }

    return "";
  }

  renderBlog() {
    const { blog } = this.props;
    if (!blog) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="row justify-content-md-center">
        <div className="col-8">
          <h3 className="mt-5 mb-4">{blog.title}</h3>
          <p>{blog.owner ? `Written by: ${blog.owner}` : ""}</p>
          <img src={blog.image} alt={blog.title} width="500px" />
          <p className="mt-4">{blog.body}</p>
          <p>
            <small className="text-muted">
              <TimeAgo date={blog.updated_at} />
            </small>
          </p>
        </div>
        {this.checkOwner()}
      </div>
    );
  }

  render() {
    return <div>{this.renderBlog()}</div>;
  }
}

const mapStateToProps = state => ({
  blog: state.blogs.blog,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getBlog, deleteBlog }
)(withRouter(BlogDetail));
