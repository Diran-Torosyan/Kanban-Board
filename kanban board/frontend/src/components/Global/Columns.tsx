import React from "react";
import Task from "./Task";

// Update TaskType to include dueDate
interface TaskType {
  title: string;
  description: string;
  due_date: string; // Add dueDate field
}

interface ColumnProps {
  title: string;
  tasks: TaskType[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div
      style={{
        backgroundColor: "#EAEAEA",
        padding: "15px",
        border: "5px solid #D22030",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "240px",
        height: "800px",
        overflowY: "auto",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          textAlign: "center",
          fontSize: "1.6vw",
          fontWeight: "bold",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Pass dueDate to each Task component */}
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            due_date={task.due_date} // Pass dueDate as a prop
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
