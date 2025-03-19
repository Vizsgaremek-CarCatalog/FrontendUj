import React, { useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const Register: React.FC<{ theme: string }> = ({ theme }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/users/", { email, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed", error);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-vh-100 d-flex justify-content-center align-items-center ${theme === "red-black" ? "bg-dark text-light" : "bg-dark text-white"}`}>
      <div className={`card shadow-lg p-4`} style={{ width: "400px", backgroundColor: theme === "red-black" ? "#D32F2F" : "#283593", color: theme === "red-black" ? "#FFFFFF" : "#FFFFFF" }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button variant="danger" type="submit" disabled={loading} className="w-100">
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
