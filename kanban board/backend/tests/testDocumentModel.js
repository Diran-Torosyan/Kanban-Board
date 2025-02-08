const documentModel = require("../models/documentModel.js");

// upload a document
const testUploadDocument = async (taskId, userId, file) => {
    try {
        const document = await documentModel.uploadDocument(taskId, userId, file);
        console.log("uploading document result: ", document);
    } catch (err) {
        console.log("upload documnet error: ", err);
    }
};

// Retrieve all documents for a task
const testFetchDocumentsByTask = async (taskId) => {
    try {
        const document = await documentModel.fetchDocumentsByTask(taskId);
        console.log("fetch document by task result: ", document);
    } catch (err) {
        console.log("fetch documents by task error: ", err);
    }
};

// Retrieve a document by ID
const testFetchDocumentById = async (documentId) => {
    try {
        const document = await documentModel.fetchDocumentById(documentId);
        console.log("fetch document by id: ", document);
    } catch (err) {
        console.log("fetch document by id error: ", err);
    }
};

// Delete a document
const testDeleteDocument = async (documentId) => {
    try {
        const document = await documentModel.deleteDocument(documentId);
        console.log("delete documents result: ", document);
    } catch (err) {
        console.log("delete document error: ", err);
    }
};

// Fetch Documents Uploaded by User
const testFetchDocumentsByUser = async (userId) => {
    try {
        const documents = await documentModel.deleteDocument(userId);
        console.log("fetch docuemnts by user result: ", documents);
    } catch (err) {
        console.log("fetch documents by user error: ", err);
    }
};

// Update Document
const testUpdateDocument = async (documentId, userId, file) => {
    try {
        const document = await documentModel.updateDocument(documentId, userId, file);
        console.log("update document result: ", document);
    } catch(err) {
        console.log("update document error: ", err);
    }
};

// Run Tests
const runTests = async () => {
    console.log("\ntest results: \n");

    await testUploadDocument(1, 2, "file");
    await testFetchDocumentsByTask(12);
    await testFetchDocumentById(12);
    await testDeleteDocument(12);
    await testFetchDocumentsByUser(1);
    await testUpdateDocument(12, 23, "file");

    console.log("\nAll tests executed.\n");
};

runTests();