import "./Profile.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserDatasView from "./components/UserDatasView/UserDatasView";
import SettingsView from "./components/SettingsView/SettingsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../Context/Theme";
import { useLogged } from "../../Context/User";
import { Link, useNavigate } from "react-router-dom";
import usePosition from "./hooks/usePosition";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut, logIn } = useLogged();
  const [userN, setData] = useState(null);
  const [time, setTime] = useState("");
  const [view, setView] = useState(false);
  const { theme } = useTheme();
  const position = usePosition();

  const uid = window.localStorage.getItem("userid");

  useEffect(() => {
    const getTimeE = () => {
      const now = new Date();
      const hour = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();
      let formattedSec = "";
      let formattedMin = "";
      let formattedHour = "";

      hour < 10 ? (formattedHour = `0${hour}`) : (formattedHour = hour);
      min < 10 ? (formattedMin = `0${min}`) : (formattedMin = min);
      sec < 10 ? (formattedSec = `0${sec}`) : (formattedSec = sec);

      const Time = `${formattedHour}:${formattedMin}:${formattedSec}`;

      setTime(() => Time);
    };

    const intervalID = setInterval(getTimeE, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const handleSettings = (event) => {
    setView((current) => !current);
  };

  const handleLogOut = async (event) => {
    logOut();
    window.localStorage.setItem("userid", "");

    navigate("/login");
  };

  useEffect(() => {
    const fetchD = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5175/api/uidtousername",
          {
            uid: uid,
          }
        );

        const data = await response.data[0]?.username;
        data ? await setData(data) : navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };
    fetchD();
  }, [uid, navigate]);

  return userN ? (
    userN && (
      <div className={`profile theme-${theme}`}>
        <div className="profile-utils">
          <div className="time">
            <p>{time}</p>
          </div>
          <div className="vertical-line"></div>
          <div className="position">
            {position.latitude != undefined &&
            position.longitude != undefined ? (
              <a
                href={`https://www.google.pl/maps/place/${position.latitude}+${position.longitude}`}
                target="_blank"
                className={`theme-${theme}`}
              >
                Position: {`${position.latitude} | ${position.longitude}`}
              </a>
            ) : (
              <p>{`${position.error}`}</p>
            )}
          </div>
          <div className="vertical-line"></div>
          <div className="profile-buttons">
            <div className="log-out">
              <button onClick={handleLogOut} className="lgOut-btn">
                Log Out
              </button>
            </div>
            <div className="settings-btn">
              <button
                className={`btn-setting theme-${theme}`}
                onClick={handleSettings}
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="greetings">
          <h1>Hello {userN}!</h1>
        </div>

        <SettingsView class={view} user={userN} />
        <UserDatasView />
      </div>
    )
  ) : (
    <h1 className={`theme-${theme}`}>Loading...</h1>
  );
};

export default Profile;
