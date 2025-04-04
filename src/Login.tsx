import React, { useState } from "react";
import axios from "./services/axiosConfig";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onLogin: (role: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
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

      onLogin(role);

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
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;