import React from "react";
import AddArticle from "../AddArticle";
import Home from "../Home/index";
import OpenArticle from "../OpenArticle/index";
import Categories from "../Categories/index";
import { Switch, Route } from "react-router-dom";
import { addArticle, updateArticle } from "./actions";
import { EditorState, ContentState } from "draft-js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.sass";

const mapStateToProps = state => {
  return {
    articles: state.articleReducer.articles,
    id: state.addEditArticleReducer.id,
    text: state.addEditArticleReducer.text
  };
};

const mapDispatchToProps = {
  addArticle,
  updateArticle
};

const Main = props => {
  const { articles, id, text, addArticle, updateArticle } = props;

  const article = articles.filter(article => {
    return article.id === id;
  });

  //Make improvements

  const Technics = articles.filter(article => {
    return article.category === "Technics";
  });

  const Food = articles.filter(article => {
    return article.category === "Food";
  });

  const Travel = articles.filter(article => {
    return article.category === "Travel";
  });

  const empty = {
    image: "",
    title: " ",
    body: "",
    author: "",
    postDate: "",
    category: ""
  };

  return (
    <main className="main">
      <Switch>
        <Route
          exact
          path="/posts"
          render={() => <Home articles={articles} />}
        />
        <Route
          path="/posts/:id"
          render={() => <OpenArticle article={article[0]} />}
        />
        <Route path="/technics" render={() => <Home articles={Technics} />} />
        <Route path="/food" render={() => <Home articles={Food} />} />
        <Route path="/travel" render={() => <Home articles={Travel} />} />
        <Route
          exact
          path="/post/new"
          render={() => (
            <AddArticle
              method={addArticle}
              article={empty}
              editorState={EditorState.createEmpty()}
              buttonName="Add Article"
            />
          )}
        />
        <Route
          path="/post/:id"
          render={() => (
            <AddArticle
              method={updateArticle}
              article={article[0]}
              editorState={EditorState.createWithContent(
                ContentState.createFromText(text)
              )}
              buttonName="Edit Article"
            />
          )}
        />
        <Route path="/categories" render={() => <Categories />} />
      </Switch>
    </main>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
