const { uploadDocument } = require('../models/documentModel.js');
const multer = require('multer');
const path = require('path');

// Configure multer to specify where and how to store files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');  // File will be saved in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  }
});

const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadDocument = async (req, res) => {
  try {
    // get fields from req
    const taskId = req.body.taskId;
    const filename = req.file.filename;
    const originalFilename = req.file.originalname;
    const userId = req.user.id; 

    // Call the model function to store document metadata (versioning, etc.)
    const documentId = await uploadDocument(taskId, userId, filename, originalFilename);
    
    res.status(201).json({ message: 'Document uploaded successfully', documentId });
  } catch (err) {
    console.error("Upload Document error:", err);
    res.status(500).json({ message: 'Error uploading document' });
  }
};
