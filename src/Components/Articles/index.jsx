import React, { Component } from "react";
import arraySort from "array-sort";
import { deleteArticle, getId, getText } from "./actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./index.sass";

const mapDispatchToProps = {
  deleteArticle,
  getId,
  getText
};

class Articles extends Component {
  state = {
    isNewestFirst: false,
    isSortByAsc: false,
    data: this.props.articles
  };

  //Make improvements

  sort = (articles, option) => {
    const { isNewestFirst, isSortByAsc } = this.state;
    if (!isNewestFirst) {
      this.setState({
        data: arraySort(articles, option),
        isNewestFirst: !isNewestFirst
      });
    } else if (isNewestFirst) {
      this.setState({
        data: arraySort(articles, option, { reverse: true }),
        isNewestFirst: !isNewestFirst
      });
    }
    if (!isSortByAsc) {
      this.setState({
        data: arraySort(articles, option),
        isSortByAsc: !isSortByAsc
      });
    } else if (isSortByAsc) {
      this.setState({
        data: arraySort(articles, option, { reverse: true }),
        isSortByAsc: !isSortByAsc
      });
    }
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.articles !== state.data) {
      return {
        data: props.articles
      };
    }
    return null;
  };

  render() {
    const { articles, getId, getText, deleteArticle } = this.props;
    const { data } = this.state;
    return (
      <div>
        <button onClick={() => this.sort(articles, "title")}>
          Sort By Title
        </button>
        <button onClick={() => this.sort(articles, "postDate")}>
          Sort By Date
        </button>
        <div className="articles">
          {data.map((article, index) => (
            <div key={index} className="article">
              <h4>{article.title}</h4>
              <div
                className="image"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div>
                <p>{article.body}</p>
              </div>
              <div className="actions">
                <button onClick={() => deleteArticle(article.id)}>
                  Remove
                </button>
                <Link to={`post/:${article.id}`}>
                  <button
                    onClick={() => {
                      getId(article.id);
                      getText(article.body);
                    }}
                  >
                    Edit
                  </button>
                </Link>
                <Link to={`/posts/:${article.id}`}>
                  <button
                    onClick={() => {
                      getId(article.id);
                    }}
                  >
                    Open
                  </button>
                </Link>
              </div>
              <div className="info">
                <div>{article.author}</div>
                <div>{article.postDate}</div>
                <div>{article.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Articles)
);
