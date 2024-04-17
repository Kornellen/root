import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTheme } from "../../Context/Theme";
import ErrInf from "./components/ErrInfo/ErrInfo";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  let err = false;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [errType, setErrType] = useState("");
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
        if (formDatas.password != "" && formDatas.username != "") {
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
            const err = response.data.err;
            console.log(err);
            setErrType(err);
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

  const handleClickPassShow = () => {
    setShowPass((current) => !current);
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
          <div className="password-log">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id=""
              placeholder="Password"
              onChange={handleChange}
            />

            <button
              onClick={handleClickPassShow}
              type="button"
              className="pass-vis-btn"
            >
              {showPass ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <div className="submit">
            <input type="submit" value="Log In" id="login" />
          </div>
          <br />
          <div className="registry">
            <button
              className="reg-btn"
              value="Registry"
              onClick={(event) => {
                event.preventDefault();
                navigate("/registry");
              }}
            >
              Registry
            </button>
          </div>
        </div>
        <div className={err ? `error` : `success`}>
          {err ? <p>Incorect Datas</p> : <p>Success</p>}
        </div>
        {errType && (
          <div className="err">
            <ErrInf err={errType} />
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
