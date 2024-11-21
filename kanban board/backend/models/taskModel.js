// Make the connction to the database
const pool = {};

// Get the a specific task by the task Id
const fetchTaskById = async (taskId) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM Tasks WHERE id = ?", [taskId]);
        return rows[0];
    } finally {
        connection.release();
    }
}

// Get the tasks that are assigned to the user
const fetchTaskByUser = async (user) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM Tasks WHERE assigned_to = ?", [user]);
        return rows;
    } finally {
        connection.release();
    }
}

// Get the tasks by status and user
const fetchTaskByUserAndStatus = async (user, status) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM Tasks WHERE assigned_to = ? AND status = ?", [user, status]);
        return rows;
    } finally {
        connection.release();
    }
}

// Create task
const createTask = async (task) => {
    const connection = await pool.getConnection();
    try {
        const {title, description, priority, status, dueDate, created_by} = task;
        const[result] = await connection.query(
            "INSERT INTO Tasks (title, description, priority, status, dueDate, created_by) VALUES (?,?,?,?,?,?)",
            [title, description, priority, status, dueDate, created_by]);

        return result.insertId;
    } finally {
        connection.release();
    }
}

// Update task
const updateTask = async (taskId, changes) => {
    const connection = await pool.getConnection();
    try {
        const {title, description, priority, status, dueDate, created_by} = changes;
        const [result] = await connection.query(
            "UPDATE Tasks SET title = ?, description = ?, priority = ?, status = ?, dueDate = ?, created_by = ? VALUES (?,?,?,?,?,?) WHERE id = ?",
            [title, description, priority, status, dueDate, created_by, taskId]);
        
        const [rows] = await connection.query("SELECT * FROM Tasks WHERE id = ?", [taskId]);
        return rows[0];
    } finally {
        connection.release();
    }
}

// Delete task
const deleteTask = async (taskId) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query("DELETE FROM Tasks WHERE id = ?");
        return result.affectedRows;
    } finally {
        connection.release();
    }
}

// Update task status
const updateTaskStatus = async (taskId, newStatus) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query("UPDATE Tasks SET status = ? WHERE id = ?", [newStatus, taskId]);
        return result.affectedRows;
    } finally {
        connection.release();
    }
}

// Assign task


