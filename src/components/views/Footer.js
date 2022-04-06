/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong></strong> item left
      </span>
      <ul className="filters">
        <li>
          <Link className="selected" to="/">
            All
          </Link>
        </li>
        <li>
          <Link to="/active">Active</Link>
        </li>
        <li>
          <Link to="/completed">Completed</Link>
        </li>
      </ul>

      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
