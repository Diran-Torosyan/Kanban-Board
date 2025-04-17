const express = require("express");
const router = express.Router();
const { authenticateJWT } = require('../middleware/authenticateJWT.js');
const { createNotification, fetchNotificationsByUser, markNotificationAsRead } = require("../controllers/notificationController.js");

router.post("/create-notification", createNotification);
router.get("/fetch-notifications", authenticateJWT, fetchNotificationsByUser);
router.patch("/read-notification", markNotificationAsRead);

// export the router
module.exports = router;