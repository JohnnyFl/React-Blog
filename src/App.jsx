import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCategories } from "./Actions/categoryActions";
import { loadArticles } from "./Actions/articlesActions";
import Main from "./Components/Main/index";
import Header from "./Components/Header";

const mapDispatchToProps = {
  loadArticles,
  loadCategories
};

class App extends Component {
  componentDidMount = () => {
    const { loadArticles, loadCategories } = this.props;
    loadArticles();
    loadCategories();
  };
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
