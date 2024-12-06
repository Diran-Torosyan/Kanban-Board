import React from "react";

interface TaskProps {
  name: string;
}

const Task: React.FC<TaskProps> = ({ name }) => {
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
      }}
    >
      {name}
    </div>
  );
};

export default Task;
