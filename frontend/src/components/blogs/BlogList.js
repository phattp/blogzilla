import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getBlogs } from "../../actions/blogs";

// Style
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: none;
    color: #555555;
  }
`;

const Heading5 = styled.h5`
  font-weight: 600;
`;

const CardContainer = styled.div`
  max-width: 720px;
  width: 720px;
`;

// BlogList Component
class BlogList extends Component {
  static propTypes = {
    blogs: PropTypes.array.isRequired
  };

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
        <CardContainer className="card mb-3" key={blog.id}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={blog.image} className="card-img" alt={blog.titlle} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <Heading5 className="card-title">
                  <StyledLink to={blog.slug} className="link-style">
                    {blog.title}
                  </StyledLink>
                </Heading5>
                <p className="card-text">{this.readMore(blog.body)}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <TimeAgo date={blog.updated_at} />
                  </small>
                </p>
              </div>
            </div>
          </div>
        </CardContainer>
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
