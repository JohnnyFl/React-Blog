import React from "react";
import "./index.sass";

const OpenArticle = ({ article }) => {
  return (
    <div className="wrapper">
      <h2>{article.title}</h2>
      <div
        className="image"
        style={{ backgroundImage: `url(${article.image})` }}
      />
      <div className="body">{article.body}</div>
      <div className="info">
        <div>{article.author}</div>
        <div>{article.postDate}</div>
        <div>{article.category}</div>
      </div>
    </div>
  );
};

export default OpenArticle;
