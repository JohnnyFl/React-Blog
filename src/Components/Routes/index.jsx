import React from "react";
import { EditorState } from "draft-js";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import OpenArticle from "../OpenArticle";
import Categories from "../Categories";
import AddArticle from "../AddArticle";
import Articles from "../Articles";

const Routes = props => {
  const {
    filteredArticles,
    articles,
    returnedArticles,
    addArticle,
    updateArticle,
    categories
  } = props;

  return (
    <main className="main">
      <Switch>
        <Route exact path="/" render={() => <h2>Welcome to Lightning</h2>} />
        <Route
          exact
          path="/posts"
          render={() => <Articles articles={filteredArticles(articles)} />}
        />
        <Route
          path="/posts/:id"
          render={({
            match: {
              params: { id }
            }
          }) => <OpenArticle id={id} />}
        />
        {categories.map(category => (
          <Route
            key={category.name}
            path={`/${category.name}`}
            render={() => (
              <Articles
                articles={filteredArticles(returnedArticles(category.name))}
              />
            )}
          />
        ))}
        <Route
          exact
          path="/post/new"
          render={() => (
            <AddArticle
              method={addArticle}
              editorState={EditorState.createEmpty()}
              buttonName="Add Article"
            />
          )}
        />
        <Route
          path="/post/:id"
          render={({
            match: {
              params: { id }
            }
          }) => {
            return (
              <AddArticle
                method={updateArticle}
                id={id}
                buttonName="Edit Article"
              />
            );
          }}
        />
        <Route path="/categories" render={() => <Categories />} />
      </Switch>
    </main>
  );
};

export default withRouter(Routes);
