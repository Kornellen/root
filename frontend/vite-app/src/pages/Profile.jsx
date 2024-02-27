import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userN, setData] = useState(null);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const response = await axios.post("http://localhost:5175/login");
        const result = response.data;

        console.log(result);

        await setData(result.login);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getDatas();
  }, []);

  return (
    <div className="Profile">
      <h1>Hello {userN}</h1>
    </div>
  );
};

export default Profile;
