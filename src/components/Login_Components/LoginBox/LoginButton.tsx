import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginButton: React.FC = () => {
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    setShowLoginFields(true);
  };

  const handleLogin = async () => {
    //login verification
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok && data.message === 'Employee login successful') {
        setSuccess("E Login successful!");
        console.log(success);
        navigate("/employee-landing");
      } else if (response.ok && data.message === 'Admin login successful') {
        setSuccess("A Login successful!");
        console.log(success);
        navigate("/admin-landing");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login.");
      console.log(error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/*Login Button */}
      {!showLoginFields && (
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "black",
            color: "white",
            fontSize: "25px",
            fontWeight: "bold",
            fontFamily: "Helvetica, Arial, sans-serif",
            width: "350px",
            padding: "15px",
            border: "none",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginTop: "-75px",
          }}
        >
          <span>Login</span>
        </button>
      )}
      {/* Email & Password Fields with Login Button */}
      {showLoginFields && (
        <div style={{ marginTop: "20px", width: "350px" }}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              marginTop: "-50px",
            }}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: "black",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Helvetica, Arial, sans-serif",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
