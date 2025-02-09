import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/adminlogin.css"
import axiosInstance from "../utils/axiosInstance";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      sessionStorage.setItem("token", response.data.accessToken);
      // console.log(sessionStorage.getItem("token"))
      navigate("/admin/dashboard/stats");

    } catch (err) {
      setError("Invalid Credentials. Try Again!");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login_button" type="submit">Login</button>
      </form>
    </div>
  );
}
