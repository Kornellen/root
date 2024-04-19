import { useState } from "react";
import "./SettingsView.css";
import axios from "axios";
import { useTheme } from "../../../../Context/Theme";

const SettingsView = (props) => {
  const [updatedUserDatas, setUUD] = useState({
    newUser: "",
    oldUser: props.user,
    newPass: "",
    oldPass: "",
  });

  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedUserDatas);

    window.localStorage.setItem("username", updatedUserDatas.newUser);

    try {
      const response = await axios.post(
        "http://localhost:5175/updateuser",
        updatedUserDatas
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUUD({
      ...updatedUserDatas,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`settings ${props.class ? "show" : "hidden"} theme-${theme}`}
    >
      <div className="settingsTable">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="newUser">New Username: </label>
          <input
            type="text"
            name="newUser"
            placeholder={props.user}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="newPass">New Password: </label>
          <input type="text" name="newPass" onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="oldPass">Old Password: </label>
          <input type="text" name="oldPass" onChange={handleChange} />
          <br />
          <br />

          <input type="submit" value="Make Changes" />
        </form>
      </div>
    </div>
  );
};

export default SettingsView;
