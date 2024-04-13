const express = require("express");
const getWords = require("../controllers/wordController");

const router = express.Router();

router.post("/", getWords);

module.exports = router;