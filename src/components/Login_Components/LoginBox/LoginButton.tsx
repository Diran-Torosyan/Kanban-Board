import React, { useState } from "react";
import SSOImage from "../../../assets/images/Key-PNG-Clipart.png";
import { useNavigate } from "react-router-dom";

const LoginButton: React.FC = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const handleSSOClick = () => {
    setShowLoginOptions((prev) => !prev);
  };

  const handleEmployeeClick = () => {
    navigate("/employee-landing");
  };

  const handleAdminClick = () => {
    navigate("/admin-landing");
  };

  return (
    <div>
      {/* SSO Login Button */}
      <button
        onClick={handleSSOClick}
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
          marginTop: "-170px",
        }}
      >
        <span>Login with SSO</span>
        <img
          src={SSOImage}
          alt="SSO Icon"
          style={{
            width: "30px",
            height: "30px",
            marginLeft: "10px",
            filter: "invert(1)",
            transform: "scaleY(-1) rotate(225deg)",
            verticalAlign: "middle",
          }}
        />
      </button>

      {/* Employee and Admin Buttons */}
      {showLoginOptions && (
        <>
          <button
            onClick={handleEmployeeClick}
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
            }}
          >
            <span>Employee</span>
          </button>

          <button
            onClick={handleAdminClick}
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
            }}
          >
            <span>Admin</span>
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
