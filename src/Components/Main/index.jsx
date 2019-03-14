import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addArticle, updateArticle } from "../../Actions/articlesActions";
import Routes from "../Routes/index";
import "./index.sass";

const mapStateToProps = ({
  articles: { articles, searchField },
  categories: { categories }
}) => {
  return {
    articles,
    categories,
    searchField
  };
};

const mapDispatchToProps = {
  addArticle,
  updateArticle
};

const Main = props => {
  const {
    articles,
    addArticle,
    updateArticle,
    searchField,
    categories
  } = props;

  const returnedArticles = name => {
    const returnedArticles = articles.filter(
      article => article.category === name
    );
    return returnedArticles;
  };

  const filteredArticles = articles => {
    const filteredArticles = articles.filter(article => {
      if (searchField === "") {
        return articles;
      } else {
        return article.title.toLowerCase().includes(searchField.toLowerCase());
      }
    });
    return filteredArticles;
  };

  if (articles.length !== 0 && categories.length !== 0) {
    return (
      <Routes
        articles={articles}
        filteredArticles={filteredArticles}
        returnedArticles={returnedArticles}
        addArticle={addArticle}
        updateArticle={updateArticle}
        categories={categories}
      />
    );
  } else {
    return null;
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
