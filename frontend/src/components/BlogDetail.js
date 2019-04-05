import React, { Component } from "react";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import { getBlog } from "../actions";

class BlogDetail extends Component {
  componentDidMount() {
    this.props.getBlog(this.props.match.params.slug);
    window.scrollTo(0, 0);
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
          <img src={blog.image} alt={blog.title} width="500px" />
          <p className="mt-4">{blog.body}</p>
          <p className="mb-5">
            <small className="text-muted">
              <TimeAgo date={blog.updated_at} />
            </small>
          </p>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderBlog()}</div>;
  }
}

const mapStateToProps = state => ({
  blog: state.blogs.blog
});

export default connect(
  mapStateToProps,
  { getBlog }
)(BlogDetail);
