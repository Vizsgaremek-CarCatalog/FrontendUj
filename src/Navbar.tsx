import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <nav>
      <div>
        <Link to="/">Car App</Link>
        <div>
          <ul>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/cars">Cars</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin">Admin Dashboard</Link>
                  </li>
                )}
                <li>
                  <button onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;