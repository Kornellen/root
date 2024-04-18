const express = require("express");
const router = express.Router();
const { addData } = require("../controllers/addDataController");

router.post("/adddata", addData);

module.exports = router;
