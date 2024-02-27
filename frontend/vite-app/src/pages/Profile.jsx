import "../assets/styles/Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userN, setData] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const getTimeE = () => {
      const now = new Date();
      const hour = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      const Time = `${hour}:${min}:${sec}`;

      setTime(() => Time);
    };

    setInterval(getTimeE, 1000);
  });

  const handleClick = (event) => {
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
    <div className="Profile">
      <h1>Hello {userN}!</h1>

      <div className="time">{time}</div>

      <div className="log-out">
        <button onClick={handleClick} className="lgOut-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
