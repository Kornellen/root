const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controllers/verifyUserController");

router.get("/verify", verifyUser);

module.exports = router;
