// Make the connction to the database
const sql = require('mssql');
let pool;

// Config for db connection
const config = {
    user: 'szadmin',
    password: 'password123!',
    server: 'kanbanboardsz.database.windows.net',
    database: 'kanban_board',
    options: {
        encrypt: true,
        trustServerCertificate: true 
    }
};

// Initialize database connection
const initializePool = async () => {
    try {
        pool = await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (err) {
        console.error("Database connection failed: ", err);
        throw err; 
    }
};

// Call function to start the pool
initializePool();

// Add a comment
const addComment = async (taskId, userId, content) => {
    try {
        const result = await pool.request()
        .insert("taskId", sql.Int, taskId)
        .insert("userId", sql.Int, userId)
        .insert("content", sql.NVarChar, content)
        .query(`INSERT INTO comments
            OUTPUT INSERTED.comment_id
            VALUES task_id = @taskId, user_id = @userId, content = @content, created_at = GETDATE()`);
        return result.recordset[0].comment_id;
    } catch (err) {
        console.error("Adding comment error", err);
        throw err;
    }
};

// Get all comments for a task
const getCommentByTask = async (taskId) => {
    try {
        const result = await pool.request()
        .insert("taskId", sql.Int, taskId)
        .query("SELECT * FROM comments WHERE task_id = taskId");
        return result;
    } catch (err) {
        console.error("Getting comments error: ", err);
        throw err;
    }
};

// Get all comments for a user
const getCommentByUser = async (userId) => {
    try {
        const result = await pool.request()
        .insert("userId", sql.Int, userId)
        .query("SELECT * FROM comments WHERE user_id = userId");
        return result;
    } catch (err) {
        console.error("Getting comments error: ", err);
        throw err;
    }
};

// Updata a comment
const updateComment = async (commentId, taskId, userId, content) => {
    try {
        const result = await pool.request()
        .insert("commentId", sql.Int, commentId)
        .insert("taskId", sql.Int, taskId)
        .insert("userId", sql.Int, userId)
        .insert("content", sql.NVarChar, content)
        .query(`
            UPDATE comments
            SET task_id = @taskId, user_id = @userId, content = @content, created_at = GETDATE()
            WHERE comment_id = commentId
        `);
        return result.rowsAffected[0];
    } catch (error) {
        console.error("Update comment error: ", err);
        throw err;
    }
};

// Delete a comment
const deleteComment = async (commentId) => {
    try {
        const result = await pool.request()
            .input('commentId', sql.Int, commentId)
            .query("DELETE FROM comments WHERE comment_id = @commentId");
        return result.rowsAffected[0];
    } catch (err) {
        console.error("Error deleting comment:", err);
        throw err;
    }
};

module.exports = {
    addComment,
    getCommentByTask,
    getCommentByUser,
    updateComment,
    deleteComment
}