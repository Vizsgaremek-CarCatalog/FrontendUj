import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CarList from "./CarList";
import AdminDashboard from "./AdminDashBoard";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Kezdetben nem admin
  const [theme, setTheme] = useState<string>("red-black");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin");
  }, []);

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setIsAdmin(role === "admin");  // Ha a role 'admin', akkor admin jogosultságot kapunk
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "red-black" ? "blue-dark" : "red-black"));
  };

  return (
    <Router>
      <div className={`min-vh-100 ${theme === "red-black" ? "bg-dark text-light" : "bg-dark text-white"}`}>
        <nav className={`navbar navbar-expand-lg ${theme === "red-black" ? "navbar-dark bg-danger" : "navbar-dark bg-primary"}`}>
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">Car App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/cars">Cars</Link>
                    </li>
                    {isAdmin && (
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/admin">Admin Dashboard</Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <button onClick={toggleTheme} className={`btn ${theme === "red-black" ? "btn-light" : "btn-dark"} position-fixed bottom-0 end-0 m-4`}>
          Switch to {theme === "red-black" ? "Blue-Dark" : "Red-Black"} Theme
        </button>

        <div className="container mt-5">
          <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />
          <Route path="/cars" element={isLoggedIn ? <CarList theme={theme} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<AdminDashboard></AdminDashboard>} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/cars" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;