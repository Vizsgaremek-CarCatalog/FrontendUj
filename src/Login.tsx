import React, { useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onLogin: () => void;
  theme: string;
};

const Login: React.FC<LoginProps> = ({ onLogin, theme }) => {
  const [email, setEmail] = useState<string>("Fleta.Mraz-Caaaaaassin@gmail.com");
  const [password, setPassword] = useState<string>("ASDaaa123###");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, password });
      
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.userid);
      
      onLogin();
      navigate("/cars");
    } catch (error: any) {
      console.error("Login failed", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={`container d-flex justify-content-center align-items-center ${theme === "green-white" ? "bg-light" : "bg-dark text-white"}`} style={{ height: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={`btn ${theme === "green-white" ? "btn-success" : "btn-dark"} w-100`}>Login</button>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
