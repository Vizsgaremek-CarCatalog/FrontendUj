import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
  toggleTheme: () => void;
  theme: string;
}

export default function Navbar({ isLoggedIn, isAdmin, onLogout, toggleTheme, theme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    ...(isLoggedIn ? [{ name: "Profile", path: "/profile" }] : []),
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const authLinks = isLoggedIn
    ? [{ name: "Logout", path: "#", onClick: onLogout }]
    : [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-blue-500 dark:bg-blue-800 text-white dark:text-gray-200 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Car Showcase</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-gray-200 dark:hover:text-gray-400 transition-colors duration-200 ${
                isActive(link.path) ? "underline font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {authLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={link.onClick}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                isActive(link.path)
                  ? "bg-white text-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white dark:text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-blue-900 px-4 pb-4 space-y-2">
          {[...navLinks, ...authLinks].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                setIsOpen(false);
                if (link.onClick) link.onClick();
              }}
              className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                isActive(link.path)
                  ? "bg-blue-700 dark:bg-blue-800 font-semibold"
                  : "hover:bg-blue-700 dark:hover:bg-blue-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
          </button>
        </div>
      )}
    </nav>
  );
}