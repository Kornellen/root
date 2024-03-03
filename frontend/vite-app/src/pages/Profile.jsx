import "../assets/styles/Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SettingsView from "../components/SettingsView/SettingsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../Context/Theme";

const Profile = () => {
  const [userN, setData] = useState(null);
  const [time, setTime] = useState("");
  const [userDatas, setUsersDatas] = useState([
    {
      dataType: null,
      dataData: null,
    },
  ]);
  const [view, setView] = useState(false);
  //const themeLS = window.localStorage.getItem("theme");

  const { theme } = useTheme();
  const username = window.localStorage.getItem("username");
  useEffect(() => {
    const getDatas = async () => {
      try {
        const response = await axios.post("http://localhost:5175/userdata", {
          username: username,
        });

        const data = await response.data.map((element) => ({
          dataType: element.dataType,
          dataData: element.dataData,
        }));

        console.log(data);
        setUsersDatas(data);
      } catch (err) {
        console.log(err);
      }
    };

    getDatas();

    console.log("Bye");
    console.log(userDatas);
  }, [username]);

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

  const handleLogOut = (event) => {
    window.localStorage.removeItem("username");
    window.location.reload();
  };
  useEffect(() => {
    const getDatasFromLocalStorage = () => {
      setData(() => window.localStorage.getItem("username"));
    };

    getDatasFromLocalStorage();
  }, []);

  return (
    <div className={`profile theme-${theme}`}>
      <h1>Hello {userN}!</h1>

      <div className="time">{time}</div>

      <div className="log-out">
        <button onClick={handleLogOut} className="lgOut-btn">
          Log Out
        </button>
      </div>

      <div className="settings-btn">
        <button className="btn-setting" onClick={handleSettings}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>

      <SettingsView
        class={view}
        user={window.localStorage.getItem("username")}
      />

      <div className="data-field">
        {userDatas && (
          <div className="data-outputs">
            {userDatas.map((element, index) => {
              return (
                <p key={index}>
                  Data Type: {element.dataType}, Data: {element.dataData}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
