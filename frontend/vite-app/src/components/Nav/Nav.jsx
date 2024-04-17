import "./Nav.css";
import ThemeBtn from "../Buttons/ThemeBtn/ThemeBtn";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../../Context/Theme";
import { useLogged } from "../../Context/User";

const Nav = () => {
  const { theme } = useTheme();
  const uid = useLogged();

  return (
    <>
      <nav className={`theme-${theme}`}>
        <ul>
          <li>
            <ThemeBtn />
          </li>
          <li>
            <Link to="/" className={`theme-${theme}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={`theme-${theme}`}>
              About
            </Link>
          </li>
          <li>
            <Link to={uid ? "dashboard" : "login"} className={`theme-${theme}`}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
