import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrInf = (props) => {
  return (
    <p>
      <FontAwesomeIcon icon={faBan} /> &nbsp;
      {props.err}
    </p>
  );
};

export default ErrInf;
