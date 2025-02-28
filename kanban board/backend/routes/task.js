const express = require("express");
const router = express.Router();
const {getUserTasks, makeTask} = require("../controllers/taskController.js");
const { authenticateJWT } = require('../middleware/authenticateJWT');

// set up get request route for task controllers
router.get("/tasks", authenticateJWT, getUserTasks);
router.post("/create-task", authenticateJWT, makeTask);

// export the router
module.exports = router;