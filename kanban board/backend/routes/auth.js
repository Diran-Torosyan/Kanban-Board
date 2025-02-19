const express = require("express");
const router = express.Router();
const {login} = require("../controllers/authController.js");

// set up post requests for the enpoints login
// call the correspoding function from the controller classs
router.post("/login", login);

// export the router
module.exports = router;