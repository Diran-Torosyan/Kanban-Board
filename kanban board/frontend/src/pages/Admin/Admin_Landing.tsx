import React, { useState, useEffect } from "react";
import Landing_Header from "../../components/Global/Landing_Header";
import Dashboard_Bar from "../../components/Global/Dashboard_Bar";
import { useNavigate } from "react-router-dom";
import "./Admin_Landing.css";

const Admin_Landing: React.FC = () => {
  const [tasks, setTasks] = useState({
    toDo: [],
    inProgress: [],
    done: [],
  });
  const [employees, setEmployees] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [taskToRemove, setTaskToRemove] = useState<any>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch employees on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/api/users/search", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch employees");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.users && Array.isArray(data.users)) {
            setEmployees(data.users);
          } else {
            console.error("Unexpected response format:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  // Fetch tasks after adding a task or on initial render
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch("http://localhost:3000/api/admin-tasks", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        if (data && data.tasks) {
          const tasksByStatus = {
            toDo: [],
            inProgress: [],
            done: [],
          };
          data.tasks.forEach((task: any) => {
            if (task.status === "To Do") {
              tasksByStatus.toDo.push(task);
            } else if (task.status === "In Progress") {
              tasksByStatus.inProgress.push(task);
            } else if (task.status === "Done") {
              tasksByStatus.done.push(task);
            }
          });
          setTasks(tasksByStatus);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  // Run fetchTasks on component mount and after adding a task
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = employees.filter((employee: any) =>
        employee.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]); // If no search query, clear filtered list
    }
  }, [searchQuery, employees]);

  // Helper function to format the date to MM/DD/YYYY
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
  };

  // Add new task
  const handleAddTask = async () => {
    if (newTaskTitle.trim()) {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      if (!selectedEmployee) {
        console.error("No employee selected. Please assign an employee to the task.");
        return;
      }
  
      // Ensure the deadline is handled correctly (Local time handling)
      let formattedDeadline = "";
      if (newTaskDeadline) {
        const dateObj = new Date(newTaskDeadline);
        dateObj.setDate(dateObj.getDate() + 2);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(dateObj.getDate()).padStart(2, "0");
  
        formattedDeadline = `${year}-${month}-${day}`; // Format as YYYY-MM-DD
      }
  
      const taskData = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: "To Do",
        due_date: formattedDeadline,
        assignedUsers: [selectedEmployee],
      };
  
      setSelectedEmployee(null); // Clear selected employee before sending
  
      try {
        // 1st request - Create the task in the database
        const response = await fetch("http://localhost:3000/api/create-task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add task: ${errorText}`);
        }
  
        // Get the full task object from the response
        const data = await response.json();
        const createdTask = data.task; // Assuming the API returns the full task object
  
        console.log(`Task created:`, createdTask);
  
        // 2nd request - Upload the file (if provided)
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("taskId", createdTask.toString()); // Link the file to the created task
  
          const fileResponse = await fetch("http://localhost:3000/api/upload-document", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
            body: formData,
          });
  
          if (!fileResponse.ok) {
            const errorText = await fileResponse.text();
            throw new Error(`Failed to upload file: ${errorText}`);
          }
          const fileResponseData = await fileResponse.json();
          console.log("File uploaded successfully", fileResponseData);
        }
  
        // Update the tasks state with the newly created task
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          updatedTasks.toDo.push(createdTask); // Add to "To Do" category or adjust based on task status
          return updatedTasks;
        });
  
        // Clear form and close modal
        setNewTaskTitle("");
        setSearchQuery("");
        setNewTaskPriority("Medium");
        setNewTaskDeadline("");
        setNewTaskDescription("");
        setFile(null);
        setIsTaskModalOpen(false);
  
        console.log(`Task "${newTaskTitle}" has been successfully assigned to employee ID: ${selectedEmployee}`);
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
        alert(`Error adding task: ${error.message}`);
      }
    } else {
      alert("Please provide a task title.");
    }
  };
  
  
  
  

  // Handle removing a task
  const handleRemoveTask = (taskId: number, category: string) => {
    setTaskToRemove({ taskId, category });
    console.log(taskId);
    setIsRemoveModalOpen(true);
  };
  
  const confirmRemoveTask = async () => {
    if (taskToRemove) {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      try {
        // Make the DELETE request to the backend API
        const response = await fetch("http://localhost:3000/api/delete-task", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ taskId: taskToRemove.taskId }), // Pass taskId here
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete task: ${errorText}`);
        }
  
        // Re-fetch the tasks from the backend after successful deletion
        fetchTasks();
  
        setIsRemoveModalOpen(false); // Close the modal
        setTaskToRemove(null); // Clear task to remove
  
      } catch (error) {
        console.error("Error removing task:", error);
        alert(`Error removing task: ${error.message}`);
      }
    }
  };

  const cancelRemoveTask = () => {
    setIsRemoveModalOpen(false); // Close the modal without removing the task
    setTaskToRemove(null); // Clear task to remove
  };

  // Navigate to the employee tasks board
  const navigateToDashboard = () => {
    navigate("/Admin-Board");
  };

  return (
    <div>
      <Landing_Header />
      <Dashboard_Bar
        title="Dashboard"
        showButton={true}
        buttonLabel="My Board"
        onButtonClick={navigateToDashboard}
      />
      <div className="admin-container">
        <div className="kanban-board">
          {Object.keys(tasks).map((category) => (
            <div key={category} className="kanban-column">
              <h3>{category.replace(/([A-Z])/g, " $1")}</h3>
              {tasks[category].map((task) => {
                //console.log(task);
                // Format the date before displaying it
                const formattedDate = task.due_date ? formatDate(new Date(task.due_date)) : "No deadline";

                return (
                  <div key={task.task_id} className="kanban-task">
                    <h4>{task.title}</h4>
                    <p>Assigned to: {task.username || "Unassigned"}</p>
                    <p>Description: {task.description}</p>
                    <p>Deadline: {formattedDate}</p> {/* Display the formatted date */}
                    {task.file && (
                      <p>
                        <a href={task.file} target="_blank" rel="noopener noreferrer">
                          Download File
                        </a>
                      </p>
                    )}
                    <button onClick={() => handleRemoveTask(task.task_id, category)}>
                      Remove Task
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="admin-tools">
          <div className="tasks-section">
            <h3>Tasks</h3>
            <button onClick={() => setIsTaskModalOpen(true)}>+ Add Task</button>
          </div>
        </div>
      </div>

      {isTaskModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <input
              type="date"
              value={newTaskDeadline}
              onChange={(e) => setNewTaskDeadline(e.target.value)}
            />

            <div className="employee-dropdown-container">
              <input
                type="text"
                className="employee-dropdown"
                placeholder="Search Employee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={!!selectedEmployee}
              />

              {selectedEmployee === null && filteredEmployees.length > 0 && (
                <div className="employee-dropdown-results">
                  {filteredEmployees.map((employee) => (
                    <div
                      key={employee.user_id}
                      onClick={() => {
                        setSelectedEmployee(employee.user_id);
                        setSearchQuery(employee.username);
                        setFilteredEmployees([]);
                      }}
                      className={selectedEmployee === employee.user_id ? "selected" : ""}
                    >
                      {employee.username}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files ? e.target.files[0] : null);
              }}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Remove task confirmation modal */}
      {isRemoveModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to remove this task?</h3>
            <button onClick={confirmRemoveTask}>Yes, Remove</button>
            <button onClick={cancelRemoveTask}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_Landing;
