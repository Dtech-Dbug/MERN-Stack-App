const express = require("express");

const router = express.Router();

//import middleware
const {
	createOrUpdateUserMiddleware,
} = require("../middlewares/authMiddleware");

//controller
const { userCart, getUserCart } = require("../controllers/userCart");

router.post("/user/cart", createOrUpdateUserMiddleware, userCart); //save cartItems in DB
router.get("/user/cart", createOrUpdateUserMiddleware, getUserCart); //get user cart info from out own backend

module.exports = router;
