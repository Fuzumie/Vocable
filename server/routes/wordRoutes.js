const express = require("express");
const {getWords, searchWordByContent} = require("../controllers/wordController");

const router = express.Router();

router.get("/", getWords);
router.get("/check", searchWordByContent);
module.exports = router;