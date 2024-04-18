const express = require("express");
const router = express.Router();
const { userData } = require("../controllers/userdataController");

router.post("/userdata", userData);

module.exports = router;
