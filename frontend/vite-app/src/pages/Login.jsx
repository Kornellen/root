import "../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Profile from "./Profile";

const Login = () => {
  const [log, setLog] = useState(false);
  const [formDatas, setFormDatas] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5174/login",
        formDatas
      );

      console.log("Server response: ", response.data);

      if (response.data.info == 200) {
        setLog((current) => !current);
      }
      if (response.data.info == "401") {
        setLog((current) => current);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  return log ? (
    <Profile />
  ) : (
    <div className="Login">
      <form action="" onSubmit={handleSubmit} className="LogForm">
        <div className="form-inputs">
          <div className="username">
            <input
              type="text"
              name="username"
              id=""
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="submit">
            <input type="submit" value="Log In" id="login" />
          </div>
        </div>
        <div className="registry">
          <button
            value="Registry"
            onClick={(event) => {
              event.preventDefault();
              navigate("/registry");
            }}
          >
            Registry
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
