const express = require('express');
const multer = require('multer');
const path = require('path');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

// Azure Blob Storage client setup
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'your-container-name';
const containerClient = blobServiceClient.getContainerClient(containerName);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },  // 50MB file size limit (adjust as necessary)
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('File must be a PDF or DOCX'));
  }
});



// Route to upload file
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
  
    const blobName = path.basename(req.file.originalname);
    const blobClient = containerClient.getBlockBlobClient(blobName);
  
    try {
      // Upload the file to Azure Blob Storage
      await blobClient.uploadData(req.file.buffer, {
        blobHTTPHeaders: { blobContentType: req.file.mimetype }
      });
  
      res.status(200).send({
        message: 'File uploaded successfully',
        blobName: blobName,
        url: blobClient.url
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Failed to upload file');
    }
  });