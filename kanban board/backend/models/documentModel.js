// Make connection to db
const pool = {};

// Upload a document
const uploadDocument = async (taskId, userId, file) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            "INSERT INTO Documents (taskId, uploaded_by, file, uploaded_on) VALUES (?, ?, ?, NOW())", [taskId, userId, file]);
        return result.insertId;
    } finally {
        connection.release();
    }
}

// Retrieve all documents for a task
const fetchDocumentsByTask = async (taskId) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM Documents WHERE task_id = ?", [taskId]);
        return rows;
    } finally {
        connection.release();
    }
} 

// Retrieve a document by ID
const fetchDocumentById = async (documentId) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM Documents WHERE document_id = ?", [documentId]);
        return rows[0];
    } finally {
        connection.release();
    }
}

// Delete a document
const deleteDocument = async (documentId) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query("DELETE FROM Documents WHERE document_id = ?", [documentId]);
        return result.affectedRows;
    } finally {
        connection.release();
    }
}

// Fetch Documents Uploaded by User
const fetchDocumentsByUser = async (userId) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM Documents WHERE uploaded_by = ?", [userId]);
        return rows;
    } finally {
        connection.release();
    }
}

// Update Document
const updateDocument = async (documentId, userId, file) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            "UPDATE Documents SET uploaded_by = ? AND file = ? WHERE document_id = ?", [userId, file, documentId]);
        return rows.affectedRows;
    } finally {
        connection.release();
    }
}