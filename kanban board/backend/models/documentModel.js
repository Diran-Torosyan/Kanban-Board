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

// upload a document
const uploadDocument = async (taskId, userId, file) => {
    try {
        const result = await pool.request()
            .input("taskId", sql.Int, taskId)
            .input("userId", sql.Int, userId)
            .input("file", sql.VarBinary(sql.MAX), file) 
            .query(`
                INSERT INTO documents (task_id, uploaded_by, pdf_document, uploaded_on)
                OUTPUT INSERTED.document_id
                VALUES (@taskId, @userId, @file, GETDATE())
            `);

        return result.recordset[0].document_id; 
    } catch (err) {
        console.error("Uploading document error: ", err);
        throw err;
    }
};

// Retrieve all documents for a task
const fetchDocumentsByTask = async (taskId) => {
    try {
        const result = await pool.request()
        .input("taskId", sql.Int, taskId)
        .query("SELECT * FROM documents WHERE task_id = @taskId");
        return result.recordset[0];
    } catch (err) {
        console.error("Fetching document error: ", err);
        throw err;
    }
};


// Retrieve a document by ID
const fetchDocumentById = async (documentId) => {
    try {
        const result = await pool.request()
        .input("documentId", sql.Int, documentId)
        .query("SELECT * FROM documents WHERE document_id = @documentId");
        return result.recordset[0];
    } catch (err) {
        console.error("Fetching document error: ", err);
        throw err;
    }
};

// Delete a document
const deleteDocument = async (documentId) => {
    try {
        const result = await pool.request()
            .input('documentId', sql.Int, documentId)
            .query("DELETE FROM documents WHERE document_id = @documentId");
        return result.rowsAffected[0];
    } catch (err) {
        console.error("Error deleting document:", err);
        throw err;
    }
};

// Fetch Documents Uploaded by User
const fetchDocumentsByUser = async (userId) => {
    try {
        const result = await pool.request()
        .input("userId", sql.Int, userId)
        .query("SELECT * FROM documents WHERE user_id = @userId");
        return result;
    } catch (err) {
        console.error("Fetching document error: ", err);
        throw err;
    }
};

// Update Document
const updateDocument = async (documentId, userId, file) => {
    try {
        const result = await pool.request()
        .input("documentId", sql.Int, documentId)
        .input("userId", sql.Int, userId)
        .input("file", sql.VarBinary(sql.MAX), file)
        .query(`
            UPDATE documents
            SET user_Id = @user_Id, pdf_document = @file
            WHERE document_id = @documentId
        `);
        return await fetchDocumentById(documentId);
    } catch(err) {
        console.error("Update document error: ", err);
        throw err;
    }
};

module.exports = {
    uploadDocument,
    fetchDocumentsByTask,
    fetchDocumentsByUser,
    fetchDocumentById,
    deleteDocument,
    updateDocument
};