import useFetch from "./hooks/useFetch";
import "./Data.css";

const Data = (props) => {
  const uid = props.uid;
  const [data] = useFetch("http://localhost:5175/api/userdata", { uid: uid });

  return (
    <div className="datas">
      {data && (
        <div className="datas-box">
          {data.map((element, index) => {
            return (
              <div className="data" key={index}>
                <p>Data Type: {element.dataType}</p>
                <p>Data: {element.data}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Data;
