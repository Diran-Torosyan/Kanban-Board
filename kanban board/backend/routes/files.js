const express = require("express");
const router = express.Router();
const {uploadMiddleware, uploadDocument, downloadDocument} = require("../controllers/filesController.js");
const { authenticateJWT } = require('../middleware/authenticateJWT.js');

// set up post requests for the files enpoints 
// call the correspoding function from the controller classs
router.post("/upload-document", authenticateJWT, uploadMiddleware, uploadDocument);
router.get("/download-document", authenticateJWT, downloadDocument);

// export the router
module.exports = router;