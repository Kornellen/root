import { useEffect, useState } from "react";
import "../../assets/styles/Nav.css";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../../Context/Theme";

const Nav = () => {
  const { theme } = useTheme();

  return (
    <>
      <nav className={`theme-${theme}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
