import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CarList from "./CarList";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [theme, setTheme] = useState<string>("green-white"); // Default theme

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "green-white" ? "green-black" : "green-white");
  };

  return (
    <Router>
      {/* Navbar with theme toggle */}
      <nav className={`navbar navbar-expand-lg ${theme === "green-white" ? "navbar-light bg-success" : "navbar-dark bg-dark"}`}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">Car App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Theme toggle button */}
      <button onClick={toggleTheme} className={`btn ${theme === "green-white" ? "btn-dark" : "btn-light"} position-fixed bottom-0 end-0 m-4`}>
        Switch to {theme === "green-white" ? "Green-Black" : "Green-White"} Theme
      </button>

      <div className={`container mt-5 ${theme === "green-white" ? "bg-light" : "bg-dark text-white"}`}>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />
          <Route path="/cars" element={isLoggedIn ? <CarList theme={theme} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/cars" : "/login"} />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
