import React, { useState } from "react";
import Landing_Header from "../../components/Global/Landing_Header";
import Dashboard_Bar from "../../components/Global/Dashboard_Bar";
import "./Admin_Landing.css";

const Admin_Landing: React.FC = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [employees, setEmployees] = useState(["John Doe", "Jane Smith"]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todo");
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const updatedTasks = { ...tasks };
      updatedTasks[selectedCategory].push({
        id: Date.now(),
        title: newTaskTitle,
        priority: newTaskPriority,
        deadline: newTaskDeadline,
        employee: selectedEmployee || "Unassigned",
        file: file ? URL.createObjectURL(file) : null,
      });
      setTasks(updatedTasks);
      setNewTaskTitle("");
      setSelectedEmployee("");
      setNewTaskPriority("Medium");
      setNewTaskDeadline("");
      setFile(null);
      setIsTaskModalOpen(false);
    }
  };

  const handleAddEmployee = () => {
    if (newEmployeeName.trim() && !employees.includes(newEmployeeName)) {
      setEmployees([...employees, newEmployeeName]);
      setNewEmployeeName("");
      setIsEmployeeModalOpen(false);
    } else {
      alert("Employee name is invalid or already exists.");
    }
  };

  const handleRemoveTask = (taskId: number, category: string) => {
    const updatedTasks = { ...tasks };
    updatedTasks[category] = updatedTasks[category].filter(
      (task) => task.id !== taskId
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Landing_Header />
      <Dashboard_Bar title="Admin Dashboard" />
      <div className="admin-container">
        <div className="kanban-board">
          {Object.keys(tasks).map((category) => (
            <div key={category} className="kanban-column">
              <h3>{category.replace(/([A-Z])/g, " $1")}</h3>
              {tasks[category].map((task) => (
                <div key={task.id} className="kanban-task">
                  <h4>{task.title}</h4>
                  <p>Assigned to: {task.employee || "Unassigned"}</p>
                  <p>
                    Priority:{" "}
                    <span
                      className={`priority-badge priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </p>
                  <p>Deadline: {task.deadline || "No deadline"}</p>
                  {task.file && (
                    <p>
                      <a
                        href={task.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download File
                      </a>
                    </p>
                  )}
                  <button
                    style={{
                      background: "#D22030",
                    }}
                    className="remove-task-button"
                    onClick={() => handleRemoveTask(task.id, category)}
                  >
                    Remove Task
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="admin-tools">
          <div className="tasks-section">
            <h3>Tasks</h3>
            <button
              style={{ background: "#D22030" }}
              className="add-task-button"
              onClick={() => setIsTaskModalOpen(true)}
            >
              + Add Task
            </button>
          </div>
          <div className="employees-section">
            <h3>Employees</h3>
            <button
              style={{ background: "#D22030" }}
              onClick={() => setIsEmployeeModalOpen(true)}
            >
              + Add Employee
            </button>
            <ul>
              {employees.map((employee) => (
                <li key={employee}>
                  <span>{employee}</span>
                  <button
                    style={{
                      background: "#D22030",
                    }}
                    className="delete-button"
                    onClick={() =>
                      setEmployees(employees.filter((e) => e !== employee))
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
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
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isEmployeeModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Employee</h3>
            <input
              type="text"
              placeholder="Employee Name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
            />
            <button onClick={handleAddEmployee}>Add Employee</button>
            <button onClick={() => setIsEmployeeModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_Landing;
