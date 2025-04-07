import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, isAdmin, onLogout }: NavbarProps) {
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
    <nav className="bg-blue-500 text-white shadow-lg sticky top-0 z-50">
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
              className={`hover:text-gray-200 transition-colors duration-200 ${
                isActive(link.path) ? "underline font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {authLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={link.onClick}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                isActive(link.path)
                  ? "bg-white text-blue-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
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
        <div className="md:hidden bg-blue-600 px-4 pb-4 space-y-2">
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
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}