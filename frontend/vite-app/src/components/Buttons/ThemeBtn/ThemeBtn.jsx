import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ThemeBtn.css";
import { useTheme } from "../../../Context/Theme";

const ThemeBtn = () => {
  // const themeBTN = window.localStorage.getItem("theme") || "light";
  // const [theme, setTheme] = useState(themeBTN);

  const { toggleTheme, theme } = useTheme();

  // const handleThmeClick = (e) => {
  //   setTheme((current) => {
  //     const newTheme = current === "light" ? "dark" : "light";
  //     window.localStorage.setItem("theme", newTheme);
  //     return newTheme;
  //   });
  // };

  return (
    <div className="theme-btn">
      <button onClick={toggleTheme} className="btn-theme">
        {theme === "light" ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </button>
    </div>
  );
};

export default ThemeBtn;
