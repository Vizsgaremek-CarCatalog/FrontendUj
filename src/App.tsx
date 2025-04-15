import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CarList from "./CarList";
import AdminDashboard from "./AdminDashboard";
import Navbar from "./Navbar";
import Home from "./components/home";
import Profile from "./components/Profile";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem("userRole") === "ADMIN");
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

  // Apply theme to document and persist in localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Update state for login/logout
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "ADMIN");
  }, [isLoggedIn]);

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setIsAdmin(role === "ADMIN");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cars" element={<CarList isLoggedIn={isLoggedIn} />} />
            <Route
              path="/admin"
              element={
                isLoggedIn && isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to={isLoggedIn ? "/cars" : "/login"} />
                )
              }
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/cars" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;