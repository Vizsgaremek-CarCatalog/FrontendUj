// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  theme: string;
  onLogout: () => void;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, isAdmin, theme, onLogout, onToggleTheme }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Car App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cars">Cars</Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className={`btn btn-primary mx-2`}
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            <li className="nav-item">
              <button
                onClick={onToggleTheme}
                className={`btn btn-theme-toggle mx-2`}
              >
                Switch to {theme === "red-black" ? "Miami Vice" : "Red-Black"} Theme
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;