import React, { Component } from "react";
import moment from "moment";
import RichEditor from "../TextArea/index";
import { addArticle, updateArticle } from "./actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    body: state.body,
    id: state.id,
    categories: state.categories
  };
};

const mapDispatchToProps = {
  addArticle,
  updateArticle
};

class AddArticle extends Component {
  constructor(props) {
    super(props);
    const { title, author, image, body, category } = this.props.article;

    this.state = {
      title: title,
      author: author,
      image: image,
      body: body,
      postDate: moment().format("L"),
      category: category
    };
  }

  onInputChange = event => {
    const target = event.target;
    this.setState({ [target.id]: target.value });
  };

  render() {
    const { title, author, image, postDate, category } = this.state;
    const {
      body,
      buttonName,
      editorState,
      method,
      id,
      categories
    } = this.props;
    return (
      <form id="post">
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            onChange={this.onInputChange}
            value={title}
            required
          />
        </label>
        <label htmlFor="author">
          Author:
          <input
            type="text"
            id="author"
            onChange={this.onInputChange}
            value={author}
            required
          />
        </label>
        <label htmlFor="image">
          ImageURL:
          <input
            type="text"
            id="image"
            onChange={this.onInputChange}
            value={image}
          />
        </label>
        <label htmlFor="postDate">
          Date:
          <span id="postDate"> {postDate}</span>
        </label>
        <br />
        <RichEditor editorState={editorState} />
        <label htmlFor="category">
          <select
            name="category"
            id="category"
            onChange={this.onInputChange}
            value={category}
          >
            {categories.map(category => (
              <option value={`${category}`}>{category}</option>
            ))}
          </select>
        </label>
        <Link to="/posts">
          <button
            onClick={() => {
              method(image, title, body, author, postDate, category, id);
            }}
          >
            {buttonName}
          </button>
        </Link>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddArticle);
