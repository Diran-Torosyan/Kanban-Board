const taskModel = require("../models/taskModel.js");

// Get the a specific task by the task Id
const testFetchTaskById = async (id) => {
    try {
        const task = await taskModel.fetchTaskById(id);
        console.log("fetch task by id result: ", task);
    } catch (err) {
        console.log("fetch task by id error: ", err);
    }
}

// Get the tasks that are assigned to the user
const testFetchTaskByUser = async (user) => {
    try {
        const task = await taskModel.fetchTaskByUser(user);
        console.log("fetch task by user results: ", task);
    } catch(err) {
        console.log("fetch task by user error: ", error);
    }
}

// Get the tasks by status and user
const testFetchTaskByUserAndStatus = async (userId, status) => {
    try {
        const task = await taskModel.fetchTaskByUserAndStatus(userId, status);
        console.log("fetch task by user and status: ", task);
    } catch(err) {
        console.log("fetch task by user and status result: ", err);
    }
}

// Create task
const testCreateTask = async (task) => {
    try {
        const taskId = await taskModel.createTask(task);
        console.log("create task results: task_id = ", taskId);
    } catch (err) {
        console.log("create task error: ", err);
    }
};


// Update task
const testUpdateTask = async (taskId, taskChanges) => {
    try {
       const task = await taskModel.updateTask(taskId, taskChanges);
       console.log("update task: ", task);
    } catch (err) {
        console.log("update task error: ", err);
    }
};

// Delete task
const testDeleteTask = async (taskId) => {
    try {
        const taskAffected = await taskModel.deleteTask(taskId);
        console.log("deleted task: ", taskAffected);
    } catch (err) {
        console.log("delete task error: ", err);
    }
};

// Update task status
const testUpdateTaskStatus = async (taskId, newStatus) => {
    try {
        const updatedTask = await taskModel.updateTaskStatus(taskId, newStatus);
        console.log("updated task status: ", updatedTask);
    } catch (err) {
        console.log("updated task error: ", err);
    }
};

// Assign task
const testAssignTask = async (taskId, userId) => {
    try {
        const task = await taskModel.assignTask(taskId, userId);
        console.log("asign task result: ", task);
    } catch (err) {
        console.log("assign task error: ", err);
    }
};

// Run Tests
const runTests = async () => {
    console.log("\ntest results: \n");

    await testFetchTaskById(1);
    await testFetchTaskByUser(1);
    await testFetchTaskByUserAndStatus(1, "pending");

    const newTask = {
        title: "Manual Test Task",
        description: "This is a test task created manually.",
        status: "pending",
        due_date: "2025-02-07",
        created_by: 1 // Change to an existing user ID
    };
    await testCreateTask(newTask);

    const updatedTask = {
        title: "Manual Test Task",
        description: "This is a test to see updated describtion.",
        status: "pending",
        due_date: "2025-02-01",
        created_by: 1 // Change to an existing user ID
    };
    await testUpdateTask(1, updatedTask);
    await testDeleteTask(2);
    await testUpdateTaskStatus(2, "done");
    await testAssignTask(2, 1);

    console.log("\nAll tests executed.\n");
};

runTests();