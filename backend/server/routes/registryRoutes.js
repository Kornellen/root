const express = require("express");
const router = express.Router();
const { registryUser } = require("../controllers/registryController");

router.post("/register", registryUser);

module.exports = router;
