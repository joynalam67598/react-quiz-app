import logo from "../assets/images/logo.jpg";
import classes from "../styles/Nav.module.css";
import Account from "./Account";
import {Link} from 'react-router-dom';
import React from 'react';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt="Learn with Sumit Logo" />
            <h3>Brain Walkout</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
