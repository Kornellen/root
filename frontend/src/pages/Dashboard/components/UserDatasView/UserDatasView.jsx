import "./UserDatasView.css";

import Data from "./components/Data/Data";
import DataForm from "./components/DataForm/DataForm";

const UserDatasView = () => {
  const uid = window.localStorage.getItem("userid");

  return (
    <div className="userDatas">
      <Data uid={uid} />
      <DataForm uid={uid} />
    </div>
  );
};

export default UserDatasView;
