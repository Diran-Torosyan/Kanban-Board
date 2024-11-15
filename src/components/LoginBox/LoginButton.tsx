import React from "react";
import SSOImage from "../../assets/images/Key-PNG-Clipart.png"; // Correct path to the image

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "black", // Button background color
        color: "white", // Text color
        fontSize: "25px", // Text size
        fontWeight: "bold", // Make the text bold
        fontFamily: "Helvetica, Arial, sans-serif",
        width: "350px",
        padding: "15px", // Padding for the button
        border: "none", // Remove default button border
        borderRadius: "5px", // Rounded corners
        display: "flex", // Flexbox to align text and image
        justifyContent: "center",
        alignItems: "center", // Vertically center the text and image
        cursor: "pointer", // Pointer cursor on hover
        marginTop: "-250px",
      }}
    >
      <span>Login with SSO</span>
      <img
        src={SSOImage} // The image next to the text
        alt="SSO Icon"
        style={{
          width: "30px", // Set the width of the image
          height: "30px", // Set the height of the image
          marginLeft: "10px", // Space between the text and the image
          filter: "invert(1)",
          transform: "scaleY(-1) rotate(225deg)",
          verticalAlign: "middle",
        }}
      />
    </button>
  );
};

export default LoginButton;
