import "../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTheme } from "../Context/Theme";

const Login = () => {
  let err = false;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [formDatas, setFormDatas] = useState({
    username: "",
    password: "",
  });
  const uid = window.localStorage.getItem("userid");
  useEffect(() => {
    if (uid) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Subimitted");
    console.log(err);

    if (formDatas.password === "" || formDatas.username === "") {
      err = true;
      e.preventDefault();
    } else {
      e.preventDefault();
      err = false;
    }

    if (err === false) {
      e.preventDefault();
      try {
        if (
          formDatas.password != null &&
          formDatas.password != undefined &&
          formDatas.password != "" &&
          formDatas.username != null &&
          formDatas.username != undefined &&
          formDatas.username != ""
        ) {
          const response = await axios.post(
            "http://localhost:5175/login",
            formDatas
          );

          if (response.data.info === 200) {
            setLog((current) => !current);
            new Promise((resolve) =>
              setTimeout(() => {
                resolve();
                navigate("/dashboard");
              }, 100)
            );
          } else {
            setLog(false);
          }
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const response2 = await axios.post(
          "http://localhost:5175/usernametouid",
          formDatas
        );

        if (response2.data[0] === undefined) {
          err = true;
        } else {
          const data = await response2.data[0].userID;

          window.localStorage.setItem("userid", data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`Login theme-${theme}`}>
      <form
        action=""
        onSubmit={handleSubmit}
        className={`LogForm theme-${theme}`}
      >
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
        <div className={err ? `error` : `success`}>
          {err ? <p>Incorect Datas</p> : <p>Success</p>}
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
