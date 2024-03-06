import { useState } from "react";
import axios from "axios";
import "../assets/styles/Registry.css";
import { useNavigate } from "react-router-dom";

const Registry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    uid: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const UserID = Math.floor(Math.random() * 100000000);

    if (e.target.password.value == e.target.passwordr.value) {
      formData.uid = UserID;
      e.preventDefault();
      localStorage.setItem(e.target.name, e.target.value);
      try {
        const response = await axios.post(
          "http://localhost:5175/registry",
          formData
        );
        console.log("Server response: ", response.data.message);
        if (response.data.message === "Success!") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      e.preventDefault();
      console.log("Passwords are incorrect");
    }
  };

  return (
    <div className="Registry">
      <form onSubmit={handleSubmit} method="post" className="RegForm">
        <div className="username">
          <input
            type="text"
            name="username"
            id=""
            placeholder="Username"
            required
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <div className="email">
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            required
            value={formData.value}
            onChange={handleChange}
          />
        </div>

        <div className="password">
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            required
            value={formData.value}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="passwordr"
            id=""
            placeholder="Repeat Password"
            required
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <div className="submit">
          <input type="submit" value="Registry" />
        </div>
      </form>
    </div>
  );
};

export default Registry;
