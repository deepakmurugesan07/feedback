import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "./SigninPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <DashboardPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
