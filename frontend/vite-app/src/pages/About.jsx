import { useTheme } from "../Context/Theme";
import "../assets/styles/About.css";

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`About theme-${theme}`}>
      <h1>About</h1>
    </div>
  );
};

export default About;
