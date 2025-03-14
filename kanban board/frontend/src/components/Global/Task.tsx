import React, { useState } from "react";

// Add dueDate to TaskProps
interface TaskProps {
  title: string;
  description: string;
  due_date: string; // Add dueDate as a prop
}

const Task: React.FC<TaskProps> = ({ title, description, due_date }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Check if dueDate is valid
  const due_dateObj = new Date(due_date);
  const formattedDueDate = due_dateObj instanceof Date && !isNaN(due_dateObj.getTime()) 
    ? due_dateObj.toLocaleDateString() 
    : "No Due Date"; // Handle invalid or missing dueDate

  return (
    <div
      style={{
        backgroundColor: "#CFCFCF",
        padding: "7px",
        margin: "5px 0",
        border: "2px solid #000000",
        borderRadius: "4px",
        textAlign: "center",
        fontSize: "1.2vw",
        fontWeight: "bold",
        fontFamily: "Helvetica, Arial, sans-serif",
        cursor: "pointer",
        maxWidth: isHovered ? "100%" : "100%",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{title}</div>
      {isHovered && (
        <div style={{ marginTop: "10px", fontSize: "1vw" }}>
          <div style={{ textAlign: "left", fontSize: ".75vw" }}>
            Description: {description}
          </div>
          <div style={{ textAlign: "left", fontSize: ".75vw", marginTop: "10px" }}>
            Due Date: {formattedDueDate} {/* Display the dueDate */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                backgroundColor: "white",
                padding: "0px 0px",
                height: "40px",
                border: "none",
                borderRadius: "4px",
                fontSize: ".7vw",
                fontWeight: "bold",
                color: "black",
                fontFamily: "Helvetica, Arial, sans-serif",
                cursor: "pointer",
                width: "130px",
              }}
              onClick={() => console.log("Submit for Approval")}
            >
              Submit for Approval
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "#black",
                padding: "0px 0px",
                height: "40px",
                border: "none",
                borderRadius: "4px",
                fontSize: ".5vw",
                fontWeight: "bold",
                cursor: "pointer",
                width: "40px",
              }}
              onClick={() => console.log("Download Content")}
            >
              <img
                src="src\\assets\\images\\image 9.png"
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "4px",
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
