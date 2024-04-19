import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import { useTheme } from "../Context/Theme";

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={`Layout theme-${theme}`}>
      <Nav />
      <Footer />
    </div>
  );
};

export default Layout;
