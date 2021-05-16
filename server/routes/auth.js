const express = require("express");

const router = express.Router();

//controllers
const { createOrUpdateUser } = require("../controllers/auth");

//middlewares
const {
	createOrUpdateUserMiddleware,
} = require("../middlewares/authMiddleware");

router.post(
	"/create-update-user",
	createOrUpdateUserMiddleware,
	createOrUpdateUser
);
//we will recieve info from FE here, so the method will be post

module.exports = router;
