import "../assets/styles/Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirectDocument } from "react-router-dom";

const Profile = () => {
  const [userN, setData] = useState(null);
  const [time, setTime] = useState("");
  const [userDatas, setUsersDatas] = useState([
    {
      dataType: null,
      dataData: null,
    },
  ]);

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

  const handleClick = (event) => {
    window.localStorage.removeItem("username");
    window.location.reload();
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
    <div className="Profile">
      <h1>Hello {userN}!</h1>

      <div className="time">{time}</div>

      <div className="log-out">
        <button onClick={handleClick} className="lgOut-btn">
          Log Out
        </button>
      </div>

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
