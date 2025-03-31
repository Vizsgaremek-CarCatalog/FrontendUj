// App.tsx
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../FrontendUj/src/Style/Themes.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CarList from "./CarList";
import AdminDashboard from "./AdminDashboard";
import Navbar from "./Navbar";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("red-black");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin");
  }, []);

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setIsAdmin(role === "admin");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "red-black" ? "miami-vice" : "red-black"));
  };

  return (
    <Router>
      <div className={`min-vh-100 ${theme}`}>
        <Navbar
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          theme={theme}
          onLogout={handleLogout}
          onToggleTheme={toggleTheme}
        />
        <div className="container mt-5">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} theme={theme} />} />
            <Route path="/register" element={<Register theme={theme} />} />
            <Route path="/cars" element={isLoggedIn ? <CarList theme={theme} /> : <Navigate to="/login" />} />    
              <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/cars" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;