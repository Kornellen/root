import { useEffect, useState } from "react";
import axios from "axios";
import Info from "./components/Info/Info";
import "./DataForm.css";

const DataForm = (props) => {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState({
    dataType: "other",
    data: "",
    uid: props.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = async () => {
      const response = await axios.post("http://localhost:5175/adddata", data);

      console.log(response.data.info);

      setStatus(response.data.info);
    };

    sendData();
  };

  return (
    <form className="add-data" onSubmit={handleSubmit}>
      <div className="data-type-form">
        <label htmlFor="dataType">Select DataType: </label>
        <select
          name="dataType"
          value={data.dataType}
          onChange={(e) => setData({ ...data, dataType: e.target.value })}
        >
          <option value="other">other</option>
          <option value="userData">userData</option>
        </select>
      </div>
      <div className="data-data-form">
        <label htmlFor="data">Type your datas: </label>
        <input
          type="text"
          name="data"
          onChange={(e) => setData({ ...data, data: e.target.value })}
          placeholder="(max 150)"
          maxLength={150}
        />
      </div>
      <div className="data-form-submit">
        <input type="submit" value="Add Data" />
      </div>
      <Info info={status} />
    </form>
  );
};
export default DataForm;
