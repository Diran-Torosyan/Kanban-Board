import React, { useState } from "react";
import SSOImage from "../../../assets/images/Key-PNG-Clipart.png";

const LoginButton: React.FC = () => {
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    setShowLoginFields((prev) => !prev);
  };

  const handleLogin = () => {//login verification
    console.log("Email:", email);
    console.log("Password:", password);
    
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/*Login Button */}
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
