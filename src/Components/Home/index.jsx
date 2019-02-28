import React, { Component } from "react";
import Articles from "../Articles";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    searchField: ""
  };

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  filteredArticles = articles => {
    const { searchField } = this.state;
    const filteredArticles = articles.filter(article => {
      if (searchField === "") {
        return articles;
      } else {
        return article.title.toLowerCase().includes(searchField.toLowerCase());
      }
    });
    return filteredArticles;
  };

  render() {
    const { articles } = this.props;
    return (
      <main>
        <Link to="/post/new">
          <button>Add Article</button>
        </Link>
        <br />
        <input
          type="text"
          onChange={this.onSearchChange}
          placeholder="Search..."
        />
        <Articles
          articles={this.filteredArticles(articles)}
          buttonName="Add Article"
        />
      </main>
    );
  }
}