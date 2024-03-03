import { useTheme } from "../Context/Theme";
import "../assets/styles/Home.css";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`Home theme-${theme}`}>
      <p>Hello Home!</p>
    </div>
  );
};

export default Home;
