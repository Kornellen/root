import { useTheme } from "../Context/Theme";
import "../assets/styles/Home.css";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`Home theme-${theme}`}>
      <h1>Hello Home!</h1>
    </div>
  );
};

export default Home;
