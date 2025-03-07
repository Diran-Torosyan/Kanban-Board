const express = require("express");
const router = express.Router();
const {getUserTasks, makeTask, getAdminTasks} = require("../controllers/taskController.js");
const { authenticateJWT } = require('../middleware/authenticateJWT');

// set up get request route for task controllers
router.get("/tasks", authenticateJWT, getUserTasks);
router.post("/create-task", authenticateJWT, makeTask);
router.get("/admin-tasks", authenticateJWT, getAdminTasks);

// export the router
module.exports = router;