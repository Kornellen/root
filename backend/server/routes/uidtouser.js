const express = require("express");
const router = express.Router();
const { uidToUser } = require("../controllers/uidtousernameController");

router.post("/uidtousername", uidToUser);

module.exports = router;
