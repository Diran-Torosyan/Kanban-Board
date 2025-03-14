import React, { useEffect, useState } from "react";
import Landing_Header from "../../components/Global/Landing_Header";
import Dashboard_Bar from "../../components/Global/Dashboard_Bar";
import Column from "../../components/Global/Columns";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let userId = null;

if (token) {
  const decodedToken = jwtDecode<{ id: string }>(token); // Updated to reflect the new `id` field
  userId = decodedToken.id; // Access `id` from the decoded token
}

const Employee_Landing: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch tasks assigned to the user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!token) {
          throw new Error("No JWT token found");
        }

        const response = await fetch("http://localhost:3000/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks, Status Code: ${response.status}`);
        }

        const data = await response.json();

        if (!data.tasks) {
          throw new Error("Tasks field is missing from the response.");
        }

        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks); // If it's an array, set it directly
        } else if (typeof data.tasks === "object") {
          data.tasks = Object.values(data.tasks); // Convert object to array
          setTasks(data.tasks);
        } else {
          throw new Error("Data format error: tasks should be an array or an object.");
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // Define your columns based on task statuses
  const columns = [
    {
      id: 1,
      title: "To-Do",
      tasks: tasks.filter((task) => task.status === "To Do"),
    },
    {
      id: 2,
      title: "In Progress",
      tasks: tasks.filter((task) => task.status === "In Progress"),
    },
    {
      id: 3,
      title: "Completed",
      tasks: tasks.filter((task) => task.status === "Completed"),
    },
  ];

  // Render loading or error message
  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Landing_Header />
      <Dashboard_Bar title="My Board" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {columns.map((column) => (
          <Column key={column.id} title={column.title} tasks={column.tasks} />
        ))}
      </div>
    </div>
  );
};

export default Employee_Landing;
