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

  // Update state whenever localStorage changes (e.g., on login/logout)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "ADMIN"); // Match Prisma enum case
  }, [isLoggedIn]); // Depend on isLoggedIn to re-run after login/logout

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setIsAdmin(role === "ADMIN"); // Ensure case matches Prisma enum
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="w-screen min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
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