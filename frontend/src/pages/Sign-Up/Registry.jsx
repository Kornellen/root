import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import "./Registry.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/Theme";

const Registry = () => {
  const { theme } = useTheme();
  const [showPass0, setShowPass0] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    uid: 0,
  });

  const handleClickPassShow0 = () => {
    setShowPass0((current) => !current);
  };
  const handleClickPassShow1 = () => {
    setShowPass1((current) => !current);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const UserID = Math.floor(Math.random() * 100000000);

    if (e.target.password.value == e.target.passwordr.value) {
      formData.uid = UserID;
      e.preventDefault();
      localStorage.setItem(e.target.name, e.target.value);
      try {
        const response = await axios.post(
          "http://localhost:5175/api/register",
          formData
        );
        console.log("Server response: ", response.data.message);
        if (response.data.message === "Success!") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      e.preventDefault();
      console.log("Passwords are incorrect");
    }
  };

  return (
    <div className={`Registry theme-${theme}`}>
      <form onSubmit={handleSubmit} method="post" className="RegForm">
        <div className="reg-inputs">
          <div className="username">
            <input
              type="text"
              name="username"
              id=""
              placeholder="Username"
              required
              value={formData.value}
              onChange={handleChange}
            />
          </div>
          <div className="email">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              required
              value={formData.value}
              onChange={handleChange}
            />
          </div>

          <div className="password-reg">
            <input
              type={showPass0 ? "text" : "password"}
              name="password"
              id=""
              placeholder="Password"
              required
              value={formData.value}
              onChange={handleChange}
            />
            <button
              onClick={handleClickPassShow0}
              className="pass-vis-btn-reg-pass"
              type="button"
            >
              {showPass0 ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
            <br />
            <input
              type={showPass1 ? "text" : "password"}
              name="passwordr"
              id=""
              placeholder="Repeat Password"
              required
              value={formData.value}
              onChange={handleChange}
            />
            <button
              onClick={handleClickPassShow1}
              className="pass-vis-btn-reg-rep"
              type="button"
            >
              {showPass1 ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <div className="submit">
            <input type="submit" value="Registry" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registry;
