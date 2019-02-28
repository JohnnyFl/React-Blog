import React from "react";
import { Link } from "react-router-dom";
import "./index.sass";

const Sidenav = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <Link to="/posts">Home</Link>
        </li>
        <li>
          <Link to="/technics">Technics</Link>
        </li>
        <li>
          <Link to="/food">Food</Link>
        </li>
        <li>
          <Link to="/travel">Travel</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
