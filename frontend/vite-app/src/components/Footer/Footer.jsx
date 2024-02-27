import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "../../assets/styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <p>Footer</p>
        <div className="footer-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Login</Link>
            </li>
            <li>
              <Link to="/registry">Registry</Link>
            </li>
          </ul>
        </div>

        <div className="contact">
          <a href="mailto:testserverow9@gmail.com" className="email-to-author">
            Email to author
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
