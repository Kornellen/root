import "../assets/styles/Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirectDocument } from "react-router-dom";
import SettingsView from "../components/SettingsView/SettingsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

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
  const [theme, setTheme] = useState(true);

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
      if (sec < 10) {
        formattedSec = `0${sec}`;
      } else {
        formattedSec = sec;
      }

      const Time = `${hour}:${min}:${formattedSec}`;

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

  const handleThmeClick = () => {
    setTheme((current) => !current);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    const getDatasFromLocalStorage = () => {
      setData(() => window.localStorage.getItem("username"));
    };

    getDatasFromLocalStorage();
  }, []);

  //console.log(userDatas);

  return (
    <div className={`profile theme-${theme ? "light" : "dark"}`}>
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

      <div className="theme-btn">
        <button onClick={handleThmeClick}>Change theme</button>
      </div>

      <SettingsView
        class={view}
        user={window.localStorage.getItem("username")}
      />

      <div className="data-field">
        {/* <div className="form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <input type="text" name="" id="" />
              <br />
              <input type="text" name="" id="" />
              <br />
              <input type="text" name="" id="" />
              <br />
              <input type="text" name="" id="" />
              <br />
              <label htmlFor="newletter">Newsletter</label>
              <input type="checkbox" name="newsletter" id="" />
            </fieldset>
          </form>
        </div> */}
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
