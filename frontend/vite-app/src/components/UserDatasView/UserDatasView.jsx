import { useEffect, useState } from "react";
import "../../assets/styles/UserDatasView.css";
import axios from "axios";

const UserDatasView = () => {
  const [data, setData] = useState(null);
  const [addData, setAddData] = useState({
    dataType: null,
    data: null,
    uid: null,
  });
  const uid = window.localStorage.getItem("userid");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("http://localhost:5175/userdata", {
        uid: uid,
      });

      const data = await response.data.map((element) => ({
        dataType: element.dataType,
        data: element.dataData,
      }));

      await setData(data);
    };

    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post("http://localhost:5175/adddata", addData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setAddData({
      ...addData,
      [e.target.name]: e.target.value,
      uid: window.localStorage.getItem("userid"),
    });
  };

  return (
    <div className="userDatas">
      {data && (
        <div className="all-datas">
          <div className="datas">
            {data.map((element, index) => {
              return (
                <div className="data">
                  <p key={index}>Data Type: {element.dataType}</p>
                  <p key={index}>Data: {element.data}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="datatype">Data Type: </label>
          <select
            name="dataType"
            value={addData.dataType}
            onChange={handleChange}
          >
            <option value="other">other</option>
            <option value="userData">userData</option>
          </select>
          <br />
          <label htmlFor="data">Data</label>
          <input type="text" name="data" onChange={handleChange} />
          <br />
          <input type="submit" value="Add data" />
        </fieldset>
      </form>
    </div>
  );
};

export default UserDatasView;
