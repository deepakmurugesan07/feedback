import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.css";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!username || !password) return alert("Fill all fields");

    try {
      await axios.post("http://localhost:5000/signin", { username, password });
      alert("User registered! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignin}>Sign Up</button>

      <div className="switch-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
}
