import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "../../assets/styles/Footer.css";
import { useTheme } from "../../Context/Theme";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <>
      <footer className={`footer theme-${theme}`}>
        <p>Footer</p>
        <div className="footer-nav">
          <ul>
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
              <Link to="/login" className={`theme-${theme}`}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/registry" className={`theme-${theme}`}>
                Registry
              </Link>
            </li>
          </ul>
        </div>

        <div className="contact">
          <a
            href="mailto:testserverow9@gmail.com"
            className={`email-to-author theme-${theme}`}
          >
            Email to author
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
