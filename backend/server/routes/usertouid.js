const express = require("express");
const router = express.Router();
const { userToUID } = require("../controllers/usernametouidController");

router.post("/usernametouid", userToUID);

module.exports = router;
