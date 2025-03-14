import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface Props {
  title: string;
  showButton?: boolean; // Optional prop to conditionally show the button
  buttonLabel?: string; // Optional prop to customize the button label
  onButtonClick?: () => void; // Optional prop for the button click handler
}

const Dashboard_Bar: React.FC<Props> = ({
  title,
  showButton = false,
  buttonLabel = "Go", // Default label for the button
  onButtonClick, // Function to handle button click
}) => {
  const navigate = useNavigate();

  const handleNavigateToAdminLanding = () => {
    navigate("/admin-landing"); // Navigate to the Admin Landing page
  };

  // Fallback to default behavior if onButtonClick is not provided
  const handleButtonClick = onButtonClick || handleNavigateToAdminLanding;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        backgroundColor: "black",
        width: "100%",
        height: "30px",
        paddingLeft: "20px",
        marginTop: "5px",
        fontSize: "18px",
        fontWeight: "bold",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div>{title}</div>
      {/* Conditionally render the button */}
      {showButton && (
        <button
          onClick={handleButtonClick}
          style={{
            marginLeft: "0px",
            backgroundColor: "black",
            color: "white",
            padding: "0px 60px",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          
          fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {buttonLabel} {/* Display dynamic label */}
        </button>
      )}
    </div>
  );
};

export default Dashboard_Bar;
