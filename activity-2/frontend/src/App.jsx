import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );
  const [auth, setAuth] = useState(() => Boolean(JSON.parse(localStorage.getItem("user") || "null")));

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setAuth={setAuth} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register setAuth={setAuth} setLoggedInUser={setLoggedInUser} />} />
          <Route
            path="/dashboard"
            element={
              auth ? (
                <Dashboard setAuth={setAuth} username={loggedInUser?.username || ""} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
