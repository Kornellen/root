import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import Layout from "./routes/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Sign-In/Login";
import NoPage from "./pages/NotFound/NoPage";
import Registry from "./pages/Sign-Up/Registry";
import Profile from "./pages/Dashboard/Profile";
import "./App.css";
import { ThemeProvider } from "./Context/Theme";
import { LoggedProvider, useLogged } from "./Context/User";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LoggedProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Profile />} />
                <Route path="registry" element={<Registry />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </LoggedProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
