import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { getBlogs } from "../actions";

// Style
const divStyle = {
  maxWidth: "720px"
};

// BlogList Component
class BlogList extends Component {
  componentDidMount() {
    this.props.getBlogs();
  }

  readMore(body) {
    return (
      body
        .split(" ")
        .splice(0, 12)
        .join(" ") + "..."
    );
  }

  renderBlogs() {
    return this.props.blogs.map(blog => {
      return (
        <div className="card mb-3" style={divStyle} key={blog.id}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={blog.image} className="card-img" alt={blog.titlle} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={blog.slug} className="link-style">
                    {blog.title}
                  </Link>
                </h5>
                <p className="card-text">{this.readMore(blog.body)}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <TimeAgo date={blog.updated_at} />
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="row justify-content-center my-5">
        {this.renderBlogs()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blogs: state.blogs.blogs
});

export default connect(
  mapStateToProps,
  { getBlogs }
)(BlogList);
