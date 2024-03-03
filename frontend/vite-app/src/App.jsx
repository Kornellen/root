import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Registry from "./pages/Registry";
import "./App.css";
import { ThemeProvider } from "./Context/Theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Login />} />
            <Route path="registry" element={<Registry />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
