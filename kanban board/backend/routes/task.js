const express = require("express");
const router = express.Router();
const {getUserTasks} = require("../controllers/taskController.js");
const { authenticateJWT } = require('../middleware/authenticateJWT');

// set up get request route for getting user tasks
router.get("/tasks", authenticateJWT, getUserTasks);

// export the router
module.exports = router;