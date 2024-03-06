import "../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./Profile";

const Login = () => {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [formDatas, setFormDatas] = useState({
    username: "",
    password: "",
  });
  const username = window.localStorage.getItem("userid");
  useEffect(() => {
    if (username) {
      try {
        const response = axios.post("http://localhost:5175/localLog", username);
        // console.log(response);
        response ? setLog(true) : setLog(false);
      } catch (err) {
        console.log("Error", err);
      }
    } else {
      setLog(false);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5175/login",
        formDatas
      );

      //console.log("Server response: ", response.data);

      if (response.data.info == 200) {
        setLog((current) => !current);
        new Promise((resolve) => setTimeout(() => navigate("/dashboard"), 100));
      }
      if (response.data.info == "401") {
        setLog((current) => current);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      console.log(formDatas.username);
      const response2 = await axios.post(
        "http://localhost:5175/usernametouid",
        formDatas
      );
      const data = await response2.data[0].userID;
      console.log(data);
      window.localStorage.setItem("userid", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
