const express = require("express");
const requireAuth = require( '../middleware/requireAuth');
const { loginUser, signupUser, getUser, updateUser } = require("../controllers/userController");
const router = express.Router();



router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/:id",requireAuth, getUser);
router.put("/:id",requireAuth, updateUser)

module.exports = router;
