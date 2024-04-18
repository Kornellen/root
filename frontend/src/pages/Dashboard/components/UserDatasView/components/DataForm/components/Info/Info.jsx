import "./Info.css";

const Info = (props) => {
  const info = props.info;
  return (
    info && (
      <div className="info">
        {info === "succes" ? (
          <p>Refresh to add data</p>
        ) : (
          <p>Error adding data</p>
        )}
      </div>
    )
  );
};

export default Info;
