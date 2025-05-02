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
    if (!pool) {
        try {
            pool = await sql.connect(config);
            console.log("Connected to SQL Server");
        } catch (err) {
            console.error("Database connection failed: ", err);
            throw err; 
        }
    }
};

// make sure that db is connected to before querying
const getPool = async () => {
    if (!pool) await initializePool();
    return pool;
};

// call function to start the pool
initializePool();

// upload a document
const uploadDocument = async (taskId, userId, filename, originalFilename) => {
    try {
        const db = await getPool();
        
        // get the maximum version for this task and original filename
        const versionResult = await db.request()
            .input("taskId", sql.Int, taskId)
            .input("originalFilename", sql.NVarChar, originalFilename)
            .query(`
                SELECT MAX(version) AS maxVersion 
                FROM documents 
                WHERE task_id = @taskId 
                  AND original_filename = @originalFilename
            `);
        
        // increment new version by 1, otherwise start at version 1 if its a new file
        let version = 1;
        if (versionResult.recordset.length > 0 && versionResult.recordset[0].maxVersion !== null) {
            version = versionResult.recordset[0].maxVersion + 1;
        }
        
        // Insert the new document record into the database with the new version info.
        const result = await db.request()
            .input("taskId", sql.Int, taskId)
            .input("userId", sql.Int, userId)
            .input("filename", sql.NVarChar, filename)
            .input("originalFilename", sql.NVarChar, originalFilename)
            .input("version", sql.Int, version)
            .query(`
                INSERT INTO documents (task_id, uploaded_by, uploaded_on, filename, original_filename, version)
                OUTPUT INSERTED.document_id
                VALUES (@taskId, @userId, GETDATE(), @filename, @originalFilename, @version)
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
        const db = await getPool();
        const result = await db.request()
        .input("taskId", sql.Int, taskId)
        .query("SELECT * FROM documents WHERE task_id = @taskId ORDER BY uploaded_on DESC");
        return result.recordset;
    } catch (err) {
        console.error("Fetching document error: ", err);
        throw err;
    }
};


// Retrieve a document by ID
const fetchDocumentById = async (documentId) => {
    try {
        const db = await getPool();
        const result = await db.request()
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
        const db = await getPool();
        const result = await db.request()
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
        const db = await getPool();
        const result = await db.request()
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
        const db = await getPool();
        const result = await db.request()
            .input("documentId", sql.Int, documentId)
            .input("userId", sql.Int, userId)
            .input("file", sql.VarBinary(sql.MAX), file)
            .query(`
                UPDATE documents
                SET uploaded_by = @userId, pdf_document = @file
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