import React from "react";
import LoginButton from "./LoginButton";

const InnerBox: React.FC = () => {
  const handleLoginClick = () => {
    console.log("Login with  SSO");
  };
  return (
    <div
      style={{
        width: "400px", // Set the width of the inner box
        height: "450px", // Set the height of the inner box
        backgroundColor: "white", // White background for the inner box
        borderRadius: "15px", // Rounded corners
        border: "0px solid black", // Black border
        display: "flex",
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
        textAlign: "center", // Center text inside the box
        marginTop: "20px", // Add space between the outer and inner box
      }}
    >
      <LoginButton onClick={handleLoginClick} />
    </div>
  );
};

export default InnerBox;
