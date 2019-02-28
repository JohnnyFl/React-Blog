import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.sass";

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const Sidenav = ({ categories }) => {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <Link to="/posts">Home</Link>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps)(Sidenav);
