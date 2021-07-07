const express = require("express");

const router = express.Router();

//import middleware
const {
	createOrUpdateUserMiddleware,
} = require("../middlewares/authMiddleware");

//controller
const { userCart } = require("../controllers/userCart");

router.post("/cart", createOrUpdateUserMiddleware, userCart);

module.exports = router;
