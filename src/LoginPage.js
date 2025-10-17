import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.css";

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return alert("Fill all fields");

    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      setUser({ username: res.data.username, token: res.data.token });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <div className="switch-link">
        Don't have an account? <a href="/signin">Sign Up</a>
      </div>
    </div>
  );
}
