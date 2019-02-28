import React, { Component } from "react";
import axios from "axios";
import Header from "./Components/Header";
import Sidenav from "./Components/Sidenav/index";
import Main from "./Components/Main/index";
import { loadArticles } from "./actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = {
  loadArticles
};

class App extends Component {
  componentDidMount = () => {
    const { loadArticles } = this.props;
    axios
      .get("http://localhost:3004/articles")
      .then(res => loadArticles(res.data))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Header />
        <Sidenav />
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
