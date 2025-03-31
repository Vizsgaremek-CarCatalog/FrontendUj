  import React, { useState } from "react";
  import axios from "./services/axiosConfig";
  import { useNavigate } from "react-router-dom";
  import { Form, Button, Alert, Spinner } from "react-bootstrap";

  const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [adminPassword, setAdminPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }

      setLoading(true);
      try {
        interface UserData {
          email: string;
          password: string;
          role: string;
          adminPassword?: string;
        }
        const userData: UserData = { email, password, role };
        if (role === "ADMIN") {
          userData.adminPassword = adminPassword;
        }
        await axios.post("http://localhost:3000/users/", userData);
        alert("Registration successful! Please log in.");
        navigate("/login");
      } catch (error: unknown) {
        console.error("Registration failed", error);
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Registration failed");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark text-white">
        <div className="card shadow-lg p-4" style={{ width: "400px", backgroundColor: "#283593", color: "#FFFFFF" }}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
            {role === "ADMIN" && (
              <Form.Group className="mb-3">
                <Form.Label>Admin Password</Form.Label>
                <Form.Control type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
              </Form.Group>
            )}
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
