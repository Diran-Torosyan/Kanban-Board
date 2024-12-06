import React, { useState } from "react";

const Notification_Button: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
      }}
    >
      <button
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#D9D9D9",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "12.9px",
          right: "120px",
        }}
        onClick={toggleDropdown}
      >
        <img
          src="src\assets\images\Notification Button.png"
          alt="Profile"
          style={{
            width: "125%",
            height: "125%",
            objectFit: "contain",
          }}
        />
      </button>
      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "60px",
            backgroundColor: "#EAEAEA",
            border: "3px solid #CFCFCF",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "Helvetica, Arial, sans-serif",
            zIndex: 1,
          }}
        >
          No new notifications
        </div>
      )}
    </div>
  );
};

export default Notification_Button;
