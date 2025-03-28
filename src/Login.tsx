  import React, { useState } from "react";
  import axios from "./axiosConfig";
  import { useNavigate } from "react-router-dom";

  type LoginProps = {
    onLogin: () => void;
    theme: string;
  };

  const Login: React.FC<LoginProps> = ({ onLogin, theme }) => {
    const [email, setEmail] = useState<string>("Teszt123@Teszt.com");
    const [password, setPassword] = useState<string>("1234Asdf###");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/auth/login", { email, password });
        
        const { token, userid, role } = response.data;
    
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userid);
        localStorage.setItem("userRole", role);
    
        onLogin();
        
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cars");
        }
      } catch (error: any) {
        console.error("Login failed", error);
        alert(error.response?.data?.message || "Login failed");
      }
    };
    

    return (
      <div className={`min-vh-100 d-flex justify-content-center align-items-center ${theme === "red-black" ? "bg-dark text-light" : "bg-dark text-white"}`}>
        <div className={`card shadow-lg p-4 ${theme === "red-black" ? "bg-danger text-light" : "bg-primary text-white"}`} style={{ width: "400px" }}>
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
            <button type="submit" className={`btn ${theme === "red-black" ? "btn-light" : "btn-dark"} w-100`}>Login</button>
          </form>
        </div>
      </div>
    );
  };

  export default Login;
