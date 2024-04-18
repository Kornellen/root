const express = require("express");
const router = express.Router();
const { updateuser } = require("../controllers/updateUserController");

router.post("/updateuser", updateuser);

module.exports = router;
